import { useSelector } from "react-redux";
import "../styles/TasksByStatus.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import TaskComponent from "./taskComponent";
import { useDispatch } from "react-redux";
import {
  INPUT_CHANGE,
  SET_SELECTED_STATUS,
  SET_SHOW_MODAL,
  SET_USER_TO_SHOW_INFO,
} from "../store/actionsTypes";

function TasksListComponent(props) {
  const dispatch = useDispatch();
  const { taskStatus, index } = props;
  const selectedSort = useSelector((state) => state.tasks.selectedSort);
  const searchValue = useSelector((state) => state.tasks.searchValue);
  const tasks = useSelector((state) => state.tasks.tasks);
  let searchedArr = [];
  let searchedArrStore = [];
  if (searchValue === "") {
    searchedArrStore = tasks;
  } else {
    searchedArrStore = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue)
    );
  }
  const logedUser = useSelector((state) => state.users.logedUser);
  const isLoged = useSelector((state) => state.users.isLoged);
  if (isLoged) {
    if (logedUser.role === "admin") {
      searchedArr = searchedArrStore;
    } else {
      searchedArr = searchedArrStore.filter(
        (task) => Number(task.assigned) === logedUser.id
      );
    }
  } else {
    searchedArr = [];
  }
  let sortedArr = [];
  if (selectedSort === "byDeadlineDate") {
    sortedArr = searchedArr.sort((a, b) => {
      return new Date(a.deadline) - new Date(b.deadline);
    });
  } else if (selectedSort === "byDateAdded") {
    sortedArr = searchedArr.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  } else if (selectedSort === "byPriority") {
    sortedArr = searchedArr.sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") {
        return -1;
      } else if (a.priority !== "High" && b.priority === "High") {
        return 1;
      } else if (a.priority === "Medium" && b.priority === "Low") {
        return -1;
      } else if (a.priority === "Low" && b.priority === "Medium") {
        return 1;
      }
      return 0;
    });
  }

  const handleAddByStatus = (taskStatus) => {
    setShowModal(true);
    const inputChangeData = {
      value: taskStatus,
      name: "status",
    };
    dispatch({
      type: INPUT_CHANGE,
      payload: inputChangeData,
    });
  };

  const setShowModal = (value) => {
    dispatch({
      type: SET_SHOW_MODAL,
      payload: value,
    });
  };

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
  const sortedArrToPrint = sortedArr.filter(
    (task) => task.status === taskStatus
  );
  return (
    <div className="task-list-container" index={index}>
      <div className="list-title-container">
        <h2
          className="list-title"
          onClick={() => handleSelectStatus(taskStatus)}
          title={taskStatus}
        >
          {taskStatus}
        </h2>
      </div>
      <Droppable droppableId={taskStatus}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sortedArrToPrint.map((task, index) => (
              <TaskComponent task={task} index={index} key={task.id} />
            ))}

            {provided.placeholder}
            <div
              className="droppable-placeholder"
              style={{
                alignItems: sortedArrToPrint.length > 0 ? "start" : "center",
              }}
            >
              {isLoged &&
                logedUser.role === "admin" &&
                (taskStatus === "New Requests" ||
                  taskStatus === "In Progress") && (
                  <button
                    className="add-button"
                    onClick={() => handleAddByStatus(taskStatus)}
                    title="add"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TasksListComponent;
