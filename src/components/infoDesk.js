import { useSelector } from "react-redux";
import "../styles/infoDesk.css";
import { useDispatch } from "react-redux";
import {
  SET_SELECTED_STATUS,
  SET_TASK_TO_SHOW_INFO,
  SET_USER_TO_SHOW_INFO,
} from "../store/actionsTypes";
import TaskInfoComponent from "./taskInfoComponent";
import { useState } from "react";
import {
  faAnglesLeft,
  faAnglesRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InfoDesk() {
  const [wideContainer, setWideContainer] = useState(false);
  const taskToShowInfo = useSelector((state) => state.tasks.taskToShowInfo);
  const dispatch = useDispatch();
  const tasksStore = useSelector((state) => state.tasks.tasks);
  let tasks = [];
  const logedUser = useSelector((state) => state.users.logedUser);
  const isLoged = useSelector((state) => state.users.isLoged);

  if (isLoged) {
    if (logedUser.role === "admin") {
      tasks = tasksStore;
    } else {
      tasks = tasksStore.filter(
        (task) => Number(task.assigned) === logedUser.id
      );
    }
  } else {
    tasks = [];
  }
  const toDo = tasks.filter((task) => task.status === "New Requests");
  const onProcess = tasks.filter((task) => task.status === "In Progress");
  const complete = tasks.filter((task) => task.status === "Complete");
  const expired = tasks.filter((task) => task.status === "Expired");
  const handleSelectStatus = (status) => {
    dispatch({
      type: SET_SELECTED_STATUS,
      payload: status,
    });
    dispatch({
      type: SET_USER_TO_SHOW_INFO,
      payload: null,
    });
  };

  const handleCloseTaskInfo = () => {
    dispatch({
      type: SET_TASK_TO_SHOW_INFO,
      payload: null,
    });
  };

  return (
    <div
      className="info-desk-container"
      style={{ width: wideContainer ? "60%" : "30%" }}
    >
      {taskToShowInfo && (
        <div className="info-close-box">
          <button
            onClick={() => setWideContainer(!wideContainer)}
            className="info-close-btn"
          >
            {wideContainer ? (
              <FontAwesomeIcon icon={faAnglesRight} />
            ) : (
              <FontAwesomeIcon icon={faAnglesLeft} />
            )}
          </button>

          <button
            onClick={() => handleCloseTaskInfo()}
            className="info-close-btn"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
      <div className="info-desk-box">
        <div className="info-desk">
          {taskToShowInfo ? (
            <TaskInfoComponent />
          ) : (
            <div>
              <div className="info-desk-title-box">
                <button
                  onClick={() => setWideContainer(!wideContainer)}
                  className="info-close-btn-dark"
                >
                  {wideContainer ? (
                    <FontAwesomeIcon icon={faAnglesRight} />
                  ) : (
                    <FontAwesomeIcon icon={faAnglesLeft} />
                  )}
                </button>
                <p className="info-desk-title">Task menu</p>
              </div>

              <table className="info-table">
                <tbody className="info-tbody">
                  <tr
                    onClick={() => handleSelectStatus("All")}
                    className="info-row"
                  >
                    <td>All:</td>
                    <td>{tasks.length}</td>
                  </tr>
                  <tr
                    onClick={() => handleSelectStatus("New Requests")}
                    className="info-row"
                  >
                    <td>New Requests:</td>
                    <td>{toDo.length}</td>
                  </tr>
                  <tr
                    onClick={() => handleSelectStatus("In Progress")}
                    className="info-row"
                  >
                    <td>In Progress:</td>
                    <td>{onProcess.length}</td>
                  </tr>
                  <tr
                    onClick={() => handleSelectStatus("Complete")}
                    className="info-row"
                  >
                    <td>Complete:</td>
                    <td>{complete.length}</td>
                  </tr>
                  <tr
                    onClick={() => handleSelectStatus("Expired")}
                    className="info-row"
                  >
                    <td>Expired:</td>
                    <td>{expired.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoDesk;
