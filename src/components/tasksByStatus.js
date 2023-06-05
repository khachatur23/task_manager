import { useSelector } from "react-redux";
import "../styles/TasksByStatus.css";
import TasksListComponent from "./taskListComponent";

import SelectedTaskListComponent from "../components/selectedTaskListComponent";

function TasksByStatus() {
  const statusArr = ["New Requests", "In Progress", "Complete", "Expired"];

  const selectedStatus = useSelector((state) => state.tasks.selectedStatus);
  return (
    <div className="all-selected-container">
      <div className="selected-status-container">{selectedStatus}</div>
      <div className="task-list-board">
        {selectedStatus === "All" ? (
          <div className="all-tasks-container">
            {statusArr.map((taskStatus, index) => (
              <TasksListComponent
                taskStatus={taskStatus}
                index={index}
                key={index}
              />
            ))}
          </div>
        ) : (
          <SelectedTaskListComponent />
        )}
      </div>
    </div>
  );
}

export default TasksByStatus;
