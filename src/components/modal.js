import { useSelector, useDispatch } from "react-redux";
import "../styles/Modal.css";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CLEAR_NEW_TASK,
  DELETE_TASK,
  INPUT_CHANGE,
  SET_NEW_TASK,
  SET_SELECTED_TASK,
  SET_SHOW_MODAL,
  SET_TASK_TO_SHOW_INFO,
} from "../store/actionsTypes";

function Modal() {
  const users = useSelector((state) => state.users.users);
  const logedUser = useSelector((state) => state.users.logedUser);
  const [titleInputError, setTitleInputError] = useState(false);
  const [descriptionInputError, setDescriptionInputError] = useState(false);
  const dispatch = useDispatch();
  const newTask = useSelector((state) => state.tasks.newTask);
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  const setShowModal = (value) => {
    dispatch({
      type: SET_SHOW_MODAL,
      payload: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!titleInputError && !descriptionInputError) {
      dispatch({
        type: SET_NEW_TASK,
        payload: newTask,
      });
      setShowModal(false);
      dispatch({
        type: SET_SELECTED_TASK,
        payload: null,
      });
      setTitleInputError(false);
      setDescriptionInputError(false);
      clearNewTask();
    }
  };

  const handleInputChange = (e) => {
    const inputChangeData = {
      value: e.target.value,
      name: e.target.name,
    };
    if (inputChangeData.name === "status") {
      dispatch({ type: INPUT_CHANGE, payload: inputChangeData });
    } else if (inputChangeData.name === "deadline") {
      dispatch({ type: INPUT_CHANGE, payload: inputChangeData });
    } else if (inputChangeData.name === "isApproved") {
      const inputChangeApproveData = {
        value: e.target.checked,
        name: e.target.name,
      };
      dispatch({ type: INPUT_CHANGE, payload: inputChangeApproveData });
    } else if (inputChangeData.name === "priority") {
      dispatch({ type: INPUT_CHANGE, payload: inputChangeData });
    } else if (inputChangeData.name === "assigned") {
      dispatch({ type: INPUT_CHANGE, payload: inputChangeData });
    } else {
      const { name, value } = e.target;
      const isValid = /^[A-Z].*\.$/.test(value);
      const input = document.getElementById(`${name}-inp`);
      if (!isValid) {
        if (input.name === "description") {
          input.className = "description-invalid";
          setDescriptionInputError(true);
        } else {
          input.className = "title-invalid";
          setTitleInputError(true);
        }
      } else {
        if (input.name === "description") {
          input.className = "description-inp";
          setDescriptionInputError(false);
        } else {
          input.className = "title-inp";
          setTitleInputError(false);
        }
      }
      dispatch({ type: INPUT_CHANGE, payload: inputChangeData });
    }
  };

  const cancelModal = () => {
    setDescriptionInputError(false);
    setTitleInputError(false);
    setShowModal(false);
    dispatch({
      type: SET_SELECTED_TASK,
      payload: null,
    });
    clearNewTask();
  };

  const clearNewTask = () => {
    dispatch({
      type: CLEAR_NEW_TASK,
    });
  };

  const handleDelete = (taskId) => {
    dispatch({ type: DELETE_TASK, payload: taskId });
    setShowModal(false);
    clearNewTask();
    dispatch({
      type: SET_TASK_TO_SHOW_INFO,
      payload: null,
    });
  };

  let addButtonClassname = "";

  titleInputError || descriptionInputError
    ? (addButtonClassname = "add-btn-disable")
    : (addButtonClassname = "add-btn");

  return (
    <div className="container-modal">
      <div className="modal-overlay" onClick={() => cancelModal()}></div>
      <div className="modal-form">
        <div className="close-box">
          <button onClick={() => cancelModal()} className="close-btn">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2 className="modal-form-title">
          {selectedTask ? "Edit task" : "New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-table">
            <div className="form-tbody">
              <div className="err-tr">
                {titleInputError ? (
                  <p className="modal-err-msg">
                    *The title must start with a capital letter and end with a
                    dot.
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="title-inp" className="form-label">
                    Title:
                  </label>
                </div>
                <div>
                  <input
                    id="title-inp"
                    type="text"
                    name="title"
                    className="title-inp"
                    value={newTask.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="err-tr">
                {descriptionInputError ? (
                  <p className="modal-err-msg">
                    *The description must start with a capital letter and end
                    with a dot.
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-row">
                <div>
                  <label htmlFor="description-inp" className="form-label">
                    Description:
                  </label>
                </div>

                <div>
                  <textarea
                    id="description-inp"
                    name="description"
                    className="description-inp"
                    value={newTask.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="user-inp" className="form-label">
                    Assigned user:
                  </label>
                </div>
                <div>
                  <select
                    className="status-inp"
                    id="user-inp"
                    name="assigned"
                    value={newTask.assigned}
                    onChange={handleInputChange}
                    required
                  >
                    {users.map((user, index) => (
                      <option value={user.id} key={index}>
                        {user.name} {user.lastname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="status-inp" className="form-label">
                    Status:
                  </label>
                </div>
                <div>
                  <select
                    className="status-inp"
                    id="status-inp"
                    name="status"
                    defaultValue={newTask.status}
                    onChange={handleInputChange}
                  >
                    <option value="New Requests">New Requests</option>
                    <option value="In Progress">In Progress</option>
                    {selectedTask && newTask.isApproved ? (
                      <option value="Complete">Complete</option>
                    ) : (
                      ""
                    )}
                    {newTask.status === "Expired" ? (
                      <option value="Expired">Expired</option>
                    ) : (
                      ""
                    )}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="status-inp" className="form-label">
                    Priority:
                  </label>
                </div>
                <div>
                  <select
                    className="status-inp"
                    id="priority-inp"
                    name="priority"
                    defaultValue={newTask.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="deadline-inp" className="form-label">
                    Deadline:
                  </label>
                </div>
                <div>
                  <input
                    type="datetime-local"
                    className="deadline-input"
                    id="deadline-inp"
                    name="deadline"
                    value={newTask.deadline}
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>
              </div>

              {selectedTask &&
                logedUser.role === "admin" &&
                newTask.status === "In Progress" && (
                  <div className="form-row">
                    <div>
                      <label htmlFor="cb1-6" className="form-label">
                        Is approved:
                      </label>
                    </div>
                    <div class="checkbox-wrapper-6">
                      <input
                        class="tgl tgl-light"
                        id="cb1-6"
                        type="checkbox"
                        defaultChecked={newTask.isApproved}
                        onChange={handleInputChange}
                        name="isApproved"
                      />
                      <label class="tgl-btn" for="cb1-6" />
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="add-delete-box">
            <button className={addButtonClassname}>
              {selectedTask ? "Save" : "Add"}
            </button>

            {selectedTask && (
              <button
                onClick={() => handleDelete(selectedTask.id)}
                className="delete-btn"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
