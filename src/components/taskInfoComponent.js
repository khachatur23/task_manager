import { useSelector } from "react-redux";
import "../styles/taskInfoComponent.css";
import { useDispatch } from "react-redux";
import {
  DELETE_TASK,
  SET_SELECTED_TASK,
  SET_SHOW_MODAL,
  SET_TASK_CLONE,
  SET_TASK_TO_SHOW_INFO,
} from "../store/actionsTypes";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentContainerComponent from "./comentContainerComponent";

function TaskInfoComponent() {
  const dispatch = useDispatch();

  const taskToShowInfo = useSelector((state) => state.tasks.taskToShowInfo);
  const users = useSelector((state) => state.users.users);
  const assignedUser = users.find(
    (user) => user.id === Number(taskToShowInfo.assigned)
  );
  const deadline = new Date(taskToShowInfo.deadline);

  const now = Date.now();

  const daysLeft = Math.floor((deadline - now) / 86400000);
  const hoursLeft = Math.floor(((deadline - now) % 86400000) / 3600000);
  let deadlineToShow = "";
  taskToShowInfo.deadline === "Complete"
    ? (deadlineToShow = "Complete")
    : deadline - now < 0
    ? (deadlineToShow = "Expired")
    : daysLeft === 0
    ? (deadlineToShow = hoursLeft + " hours ")
    : (deadlineToShow = daysLeft + " days " + hoursLeft + " hours ");
  let priorityClassname = "";
  if (taskToShowInfo.priority === "High") {
    priorityClassname = "high-priority";
  } else if (taskToShowInfo.priority === "Medium") {
    priorityClassname = "medium-priority";
  } else if (taskToShowInfo.priority === "Low") {
    priorityClassname = "low-priority";
  }

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

  return (
    <div className="task-info-container">
      <table className="task-info-table">
        <tbody className="task-info-tbody">
          <tr className="task-info-row">
            <td className="task-info-title">{taskToShowInfo.title}</td>
            <td>
              {taskToShowInfo.isApproved ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  title="Approved!"
                  className="approved-infodesk-task"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  title="Not approved!"
                  className="not-approved-infodesk-task"
                />
              )}
            </td>
          </tr>
          <tr className="task-info-row">
            <td>Assigned:</td>
            <td className="task-info-value">
              {assignedUser.name} {assignedUser.lastname}
            </td>
          </tr>
          <tr className="task-info-row">
            <td>Status:</td>
            <td className="task-info-value">{taskToShowInfo.status}</td>
          </tr>
          <tr className="task-info-row">
            <td className={priorityClassname}>Priority:</td>
            <td className={priorityClassname}>{taskToShowInfo.priority}</td>
          </tr>
          <tr className="task-info-row">
            <td>Added:</td>
            <td className="task-info-value">{taskToShowInfo.date}</td>
          </tr>
          <tr className="task-info-row">
            <td>Time left:</td>
            <td className="task-info-value">{deadlineToShow}</td>
          </tr>
          <tr className="task-info-row">
            <td>Description:</td>
            <td className="task-info-value">{taskToShowInfo.description}</td>
          </tr>
          <tr className="task-info-row">
            <td>
              <a
                href="https://github.com/khachatur23"
                className="github-link"
                title="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </td>
          </tr>

          <tr className="task-info-btn-row">
            <td>
              <button
                onClick={() => handleTaskClick(taskToShowInfo)}
                className="info-desk-edit-btn"
                title="edit"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={() => handleTaskClone(taskToShowInfo)}
                className="info-desk-edit-btn"
                title="clone"
              >
                Clone
              </button>
            </td>
            <td>
              <button
                onClick={() => handleDeleteFromList(taskToShowInfo.id)}
                className="info-desk-delete-from-list"
                title="delete"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <CommentContainerComponent task={taskToShowInfo} />
    </div>
  );
}

export default TaskInfoComponent;
