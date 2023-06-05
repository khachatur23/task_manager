import { useSelector } from "react-redux";
import "../styles/selectedTaskListComponent.css";
import SelectedTaskComponent from "./selectedTaskComponent";

function SelectedTaskListComponent() {
  const selectedSort = useSelector((state) => state.tasks.selectedSort);
  const selectedStatus = useSelector((state) => state.tasks.selectedStatus);
  const searchValue = useSelector((state) => state.tasks.searchValue);
  const tasks = useSelector((state) => state.tasks.tasks);
  const logedUser = useSelector((state) => state.users.logedUser);
  const isLoged = useSelector((state) => state.users.isLoged);
  const selectedArr = tasks.filter((task) => task.status === selectedStatus);
  let searchedSelectedArrStore = [];
  let searchedSelectedArr = [];
  if (searchValue === "") {
    searchedSelectedArrStore = selectedArr;
  } else {
    searchedSelectedArrStore = selectedArr.filter(
      (task) =>
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue)
    );
  }

  if (isLoged) {
    if (logedUser.role === "admin") {
      searchedSelectedArr = searchedSelectedArrStore;
    } else {
      searchedSelectedArr = searchedSelectedArrStore.filter(
        (task) => Number(task.assigned) === logedUser.id
      );
    }
  } else {
    searchedSelectedArr = [];
  }

  let sortedSelectedArr = [];
  if (selectedSort === "byDeadlineDate") {
    sortedSelectedArr = searchedSelectedArr.sort((a, b) => {
      return new Date(a.deadline) - new Date(b.deadline);
    });
  } else if (selectedSort === "byDateAdded") {
    sortedSelectedArr = searchedSelectedArr.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  } else if (selectedSort === "byPriority") {
    sortedSelectedArr = searchedSelectedArr.sort((a, b) => {
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

  const evenArr = [];
  const oddArr = [];

  for (let i = 0; i < sortedSelectedArr.length; i++) {
    if (i % 2 === 0) {
      evenArr.push(sortedSelectedArr[i]);
    } else {
      oddArr.push(sortedSelectedArr[i]);
    }
  }
  let emptyListClassname = "";
  if (sortedSelectedArr.length < 1) {
    emptyListClassname = "empty-list-message";
  } else {
    emptyListClassname = "empty-list-message-hidden";
  }
  let emptyListClassText = "";
  if (sortedSelectedArr.length < 1) {
    emptyListClassText = "No tasks found";
  } else {
    emptyListClassText = "";
  }
  return (
    <div className="selected-page-container">
      <div className="selected-container">
        <div className="selected-task-list">
          <div className="selected-task-column-list">
            {evenArr.map((task, index) => (
              <SelectedTaskComponent task={task} index={index} key={task.id} />
            ))}
          </div>
          <div className="selected-task-column-list">
            {oddArr.map((task, index) => (
              <SelectedTaskComponent task={task} index={index} key={task.id} />
            ))}
          </div>
        </div>

        <div className={emptyListClassname}>{emptyListClassText}</div>
      </div>
    </div>
  );
}

export default SelectedTaskListComponent;
