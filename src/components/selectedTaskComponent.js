import { useDispatch } from "react-redux";
import {
  DELETE_TASK,
  SET_SELECTED_TASK,
  SET_SHOW_MODAL,
  SET_TASK_CLONE,
} from "../store/actionsTypes";
import {
  faAngleDown,
  faAngleUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/selectedTaskComponent.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import CommentContainerComponent from "./comentContainerComponent";

function SelectedTaskComponent(props) {
  const { task } = props;
  const users = useSelector((state) => state.users.users);
  const assignedUser = users.find((user) => user.id === Number(task.assigned));

  const [showComment, setShowComment] = useState(false);

  const dispatch = useDispatch();
  const deadline = new Date(task.deadline);
  const now = Date.now();
  const timeLeft = deadline - now;
  const daysLeft = Math.floor(timeLeft / 86400000);
  const hoursLeft = Math.floor((timeLeft % 86400000) / 3600000);
  const minutesLeft = Math.floor((timeLeft % 3600000) / 60000);

  let daysStr = "";
  let hoursStr = "";
  let minutesStr = "";
  minutesLeft === 1 ? (minutesStr = "minute") : (minutesStr = "minutes");
  hoursLeft === 1 ? (hoursStr = "hour") : (hoursStr = "hours");
  daysLeft === 1 ? (daysStr = "day") : (daysStr = "days");
  let deadlineToShow = "";
  task.deadline === "complete"
    ? (deadlineToShow = "complete")
    : timeLeft < 0
    ? (deadlineToShow = "expired")
    : daysLeft === 0 && hoursLeft >= 1
    ? (deadlineToShow =
        hoursLeft + " " + hoursStr + " " + minutesLeft + " " + minutesStr)
    : daysLeft === 0 && hoursLeft === 0
    ? (deadlineToShow = minutesLeft + " " + minutesStr)
    : (deadlineToShow =
        daysLeft + " " + daysStr + " " + hoursLeft + " " + hoursStr);

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
  };

  const handeleOpenCommentWindow = () => {
    setShowComment(!showComment);
  };

  let priorityClassname = "";
  if (task.priority === "High") {
    priorityClassname = "high-priority";
  } else if (task.priority === "Medium") {
    priorityClassname = "medium-priority";
  } else if (task.priority === "Low") {
    priorityClassname = "low-priority";
  }

  return (
    <div className="task-from-list" key={task.id}>
      <table className="selected-task-info-table">
        <tbody className="selected-task-info-tbody">
          <tr className="selected-task-info-row">
            <td className="selected-task-info-title">{task.title}</td>
            <td>
              {task.isApproved ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  title="Approved!"
                  className="selected-approved-task"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  title="Not approved!"
                  className="selected-not-approved-task"
                />
              )}
            </td>
          </tr>
          <tr className="selected-task-info-row">
            <td>Assigned:</td>
            <td className="selected-task-info-value">
              {assignedUser.name} {assignedUser.lastname}
            </td>
          </tr>
          <tr className="selected-task-info-row">
            <td>Status:</td>
            <td className="selected-task-info-value">{task.status}</td>
          </tr>
          <tr className="selected-task-info-row">
            <td className={priorityClassname}>Priority:</td>
            <td className={priorityClassname}>{task.priority}</td>
          </tr>
          <tr className="selected-task-info-row">
            <td>Added:</td>
            <td className="selected-task-info-value">{task.date}</td>
          </tr>
          <tr className="selected-task-info-row">
            <td>Time left:</td>
            <td className="selected-task-info-value">{deadlineToShow}</td>
          </tr>
          <tr className="selected-task-info-row">
            <td>Description:</td>
            <td className="selected-task-info-value">{task.description}</td>
          </tr>
          <tr className="selected-task-info-row">
            <td>
              <a href="https://github.com/khachatur23" className="github-link">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </td>
          </tr>
          <tr className="selected-task-info-row">
            <td>
              <button
                onClick={() => handleTaskClick(task)}
                className="selected-edit-btn"
                title="edit"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={() => handleTaskClone(task)}
                className="selected-edit-btn"
                title="clone"
              >
                Clone
              </button>
            </td>
            <td>
              <button
                onClick={() => handleDeleteFromList(task.id)}
                className="selected-delete-from-list"
                title="delete"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {showComment && <CommentContainerComponent task={task} />}
      <div
        className="selected-task-comment-btn"
        onClick={() => handeleOpenCommentWindow(task)}
      >
        {showComment ? (
          <FontAwesomeIcon icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </div>
    </div>
  );
}

export default SelectedTaskComponent;
