import { useSelector } from "react-redux";
import "../styles/commentContainerComponent.css";
import { useDispatch } from "react-redux";
import { COMMENT_INPUT_CHANGE, SET_NEW_COMMENT } from "../store/actionsTypes";

import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentHomePageComponent from "./commentHomePageComponent";
import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";

function CommentContainerComponent(props) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
  const users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();
  const regex = /^\s*$/;
  const commentInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { task } = props;
  const logedUser = useSelector((state) => state.users.logedUser);

  const comments = task.comment;

  const handleInfodeskCommentInputChange = (e) => {
    const value = e.target.value;
    task.newComment = value;
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: task,
    });

    if (value.includes("@")) {
      const inputParts = value.split("@");
      const enteredUsername = inputParts[inputParts.length - 1];
      const matchedUsers = users.filter((user) =>
        user.name.startsWith(enteredUsername)
      );
      setFilteredUsers(matchedUsers);
    } else {
      setFilteredUsers([]);
    }

    setSelectedUserIndex(-1);
  };

  const insertUsername = (user) => {
    const value = commentInputRef.current.value;
    const inputParts = value.split("@");
    const markedUsername = user.name + " " + user.lastname;
    inputParts[inputParts.length - 1] = markedUsername;
    const newValue = inputParts.join("@");
    commentInputRef.current.value = newValue;
    task.newComment = newValue;
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: task,
    });
    setFilteredUsers([]);
    setSelectedUserIndex(-1);
    commentInputRef.current.focus();
  };
  const onEmojiClick = (emojiObject) => {
    if (commentInputRef.current) {
      commentInputRef.current.value += emojiObject.emoji;
      task.newComment = commentInputRef.current.value;
      dispatch({
        type: COMMENT_INPUT_CHANGE,
        payload: task,
      });
    }
  };

  const handleInfodeskCommentAdd = (task) => {
    const commentToAdd = {
      commentTaskId: task.id,
      commentToAdd: task.newComment,
      commentUserToAdd: logedUser,
    };
    if (!regex.test(task.newComment)) {
      dispatch({
        type: SET_NEW_COMMENT,
        payload: commentToAdd,
      });
      if (commentInputRef.current) {
        commentInputRef.current.value = "";
      }
      setShowEmoji(false);
    }
  };

  const handleKeyDown = (e) => {
    if (filteredUsers.length > 0) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedUserIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredUsers.length - 1
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedUserIndex((prevIndex) =>
          prevIndex < filteredUsers.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedUserIndex !== -1) {
          const selectedUser = filteredUsers[selectedUserIndex];
          insertUsername(selectedUser);
        }
      }
    }
  };

  useEffect(() => {
    if (selectedUserIndex !== -1 && autocompleteRef.current) {
      const selectedElement =
        autocompleteRef.current.childNodes[selectedUserIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedUserIndex]);

  let infoDeskCommentButtonClassName = "";
  if (regex.test(task.newComment)) {
    infoDeskCommentButtonClassName = "infodesk-disable-comment-add-button";
  } else {
    infoDeskCommentButtonClassName = "infodesk-comment-add-button";
  }

  let showEmojiBtnClassname = "";
  if (showEmoji) {
    showEmojiBtnClassname = "show-emoji-btn-open";
  } else {
    showEmojiBtnClassname = "show-emoji-btn";
  }

  return (
    <div className="infodesk-comment-container">
      <div className="infodesk-comment-div">
        <h4 className="comment_title">Comments</h4>
        <textarea
          ref={commentInputRef}
          className="infodesk-comment-inp"
          onChange={handleInfodeskCommentInputChange}
          onKeyDown={handleKeyDown}
        />
        {filteredUsers.length > 0 && (
          <ul
            ref={autocompleteRef}
            className={`user-autocomplete-list ${
              filteredUsers.length > 0 ? "show" : ""
            }`}
          >
            {filteredUsers.map((user, index) => (
              <li
                key={user.id}
                className={selectedUserIndex === index ? "selected" : ""}
                onClick={() => insertUsername(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
        {showEmoji && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <div className="comment-add-div">
          <button
            onClick={() => handleInfodeskCommentAdd(task)}
            className={infoDeskCommentButtonClassName}
          >
            Add comment
          </button>
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className={showEmojiBtnClassname}
          >
            <FontAwesomeIcon icon={faFaceSmile} />
          </button>
        </div>

        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentHomePageComponent
              comment={comment}
              key={comment.id}
              index={index}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default CommentContainerComponent;
