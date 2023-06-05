import { useDispatch } from "react-redux";
import "../styles/taskComponent.css";
import {
  DELETE_TASK,
  SET_SELECTED_TASK,
  SET_SHOW_MODAL,
  SET_TASK_CLONE,
  SET_TASK_TO_SHOW_INFO,
} from "../store/actionsTypes";
import {
  faTrashCan,
  faPenToSquare,
  faClone,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import CommentHomePageComponent from "./commentHomePageComponent";
import { useSelector } from "react-redux";

function TaskComponent(props) {
  const [showComment, setShowComment] = useState(false);
  const { task, index } = props;
  const comments = task.comment;
  const dispatch = useDispatch();
  const deadline = new Date(task.deadline);
  const now = Date.now();
  const timeLeft = deadline - now;
  const daysLeft = Math.floor(timeLeft / 86400000);
  const hoursLeft = Math.floor((timeLeft % 86400000) / 3600000);
  const minutesLeft = Math.floor((timeLeft % 3600000) / 60000);
  const users = useSelector((state) => state.users.users);
  const assignedUser = users.find((user) => user.id === Number(task.assigned));
  let daysStr = "";
  let hoursStr = "";
  let minutesStr = "";
  minutesLeft === 1 ? (minutesStr = "minute") : (minutesStr = "minutes");
  hoursLeft === 1 ? (hoursStr = "hour") : (hoursStr = "hours");
  daysLeft === 1 ? (daysStr = "day") : (daysStr = "days");

  let deadlineClassName = "";
  let taskClassname = "";
  if (task.deadline === "Complete") {
    deadlineClassName = "deadlineComplete";
    taskClassname = "task-complete";
  } else if (timeLeft < 0 && task.isApproved) {
    deadlineClassName = "deadlineComplete";
    taskClassname = "task-complete";
  } else if (timeLeft < 0 && !task.isApproved) {
    deadlineClassName = "deadlineBlack";
    taskClassname = "task-expired";
  } else if (daysLeft < 1) {
    deadlineClassName = "deadlineRed";
    taskClassname = "task-red";
  } else if (daysLeft < 3 && daysLeft >= 1) {
    deadlineClassName = "deadlineOrange";
    taskClassname = "task-orange";
  } else {
    deadlineClassName = "deadlineGreen";
    taskClassname = "task-green";
  }
  let deadlineToShow = "";
  task.deadline === "Complete"
    ? (deadlineToShow = "Complete")
    : timeLeft < 0 && task.isApproved
    ? (deadlineToShow = "Complete")
    : timeLeft < 0 && !task.isApproved
    ? (deadlineToShow = "Expired")
    : daysLeft === 0 && hoursLeft >= 1
    ? (deadlineToShow =
        hoursLeft + " " + hoursStr + " " + minutesLeft + " " + minutesStr)
    : daysLeft === 0 && hoursLeft === 0
    ? (deadlineToShow = minutesLeft + " " + minutesStr)
    : (deadlineToShow =
        daysLeft + " " + daysStr + " " + hoursLeft + " " + hoursStr);

  const handleShowTaskInfo = (task) => {
    dispatch({
      type: SET_TASK_TO_SHOW_INFO,
      payload: task,
    });
  };

  const setShowModal = (value) => {
    dispatch({
      type: SET_SHOW_MODAL,
      payload: value,
    });
  };

  const handleTaskClick = (task) => {
    setShowModal(true);
    dispatch({
      type: SET_SELECTED_TASK,
      payload: task,
    });
  };

  const handleTaskClone = (task) => {
    dispatch({
      type: SET_TASK_CLONE,
      payload: task,
    });
  };

  const handleDeleteFromList = (id) => {
    dispatch({ type: DELETE_TASK, payload: id });
    dispatch({
      type: SET_TASK_TO_SHOW_INFO,
      payload: null,
    });
  };

  const handeleOpenCommentWindow = () => {
    setShowComment(!showComment);
  };

  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          className={taskClassname}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={index}
        >
          <div className="task-header">
            <div>
              {task.isApproved ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  title="Approved!"
                  className="approved-task"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  title="Not approved!"
                  className="not-approved-task"
                />
              )}
            </div>
            <div>
              {" "}
              <button
                onClick={() => handleTaskClick(task)}
                className="edit-btn"
                title="edit"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                onClick={() => handleTaskClone(task)}
                className="edit-btn"
                title="clone"
              >
                <FontAwesomeIcon icon={faClone} />
              </button>
              <button
                onClick={() => handleDeleteFromList(task.id)}
                className="delete-from-list"
                title="delete"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
          <h3 className="task-title" onClick={() => handleShowTaskInfo(task)}>
            {task.title}
          </h3>
          <div className="time-assigned">
            <p className={deadlineClassName}>{deadlineToShow}</p>
            <img
              src={require("../avatars/" + assignedUser.avatar)}
              alt="avatar"
              className="task-component-avatar"
              title={assignedUser.name + " " + assignedUser.lastname}
            />
          </div>

          {showComment && (
            <div className="comment-container">
              <h4>Comments:</h4>
              <div className="prev-comments-div">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <CommentHomePageComponent
                      comment={comment}
                      key={comment.id}
                      index={index}
                    />
                  ))
                ) : (
                  <p className="empty-comments">No comments yet.</p>
                )}
              </div>
            </div>
          )}
          <div
            className="comment-btn"
            onClick={() => handeleOpenCommentWindow(task)}
          >
            {showComment ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskComponent;
