import { useSelector } from "react-redux";
import "../styles/commentHomePageComponent.css";
import { useDispatch } from "react-redux";
import { SET_USER_TO_SHOW_INFO } from "../store/actionsTypes";

function CommentHomePageComponent(props) {
  const { comment, index } = props;
  const users = useSelector((state) => state.users.users);
  const commentUser = users.find((user) => user.id === comment.commentUser.id);

  const dispatch = useDispatch();

  const handleUserClick = (userId) => {
    const tagUser = users.find((user) => user.id === userId);
    dispatch({
      type: SET_USER_TO_SHOW_INFO,
      payload: tagUser,
    });
  };

  const renderCommentText = () => {
    const regex = /@(\w+)\s(\w+)/g;
    let lastIndex = 0;
    let result = [];
    let match;

    while ((match = regex.exec(comment.commentText)) !== null) {
      const [mention, firstName, lastName] = match;

      if (match.index > lastIndex) {
        result.push(comment.commentText.substring(lastIndex, match.index));
      }

      const user = users.find(
        (user) => user.name === firstName && user.lastname === lastName
      );

      if (user) {
        const userId = user.id;
        result.push(
          <span
            key={mention}
            className="user-link"
            onClick={() => handleUserClick(userId)}
            title={firstName + " " + lastName + " info"}
          >
            @{firstName} {lastName}
          </span>
        );
      } else {
        result.push(mention);
      }

      lastIndex = match.index + mention.length;
    }

    if (lastIndex < comment.commentText.length) {
      result.push(comment.commentText.substring(lastIndex));
    }

    return result;
  };

  return (
    <div className="comment-div" index={index} key={comment.id}>
      <div className="comment-user-div">
        <div
          className="task-list-comment-user"
          title={commentUser.name + " " + commentUser.lastname}
          onClick={() => handleUserClick(commentUser.id)}
        >
          <img
            src={require("../avatars/" + commentUser.avatar)}
            alt="avatar"
            className="task-component-comment-avatar"
          />{" "}
          {commentUser.name} {commentUser.lastname}
        </div>
        <div>{comment.commentTime}</div>
      </div>
      <p className="comment-text-div">{renderCommentText()}</p>
    </div>
  );
}

export default CommentHomePageComponent;
