import {
  CLEAR_NEW_TASK,
  COMMENT_INPUT_CHANGE,
  DELETE_TASK,
  INPUT_CHANGE,
  SET_NEW_COMMENT,
  SET_NEW_TASK,
  SET_SEARCH_VALUE,
  SET_SELECTED_SORT,
  SET_SELECTED_STATUS,
  SET_SELECTED_TASK,
  SET_SHOW_MODAL,
  SET_STATUS_DND,
  SET_TASK_CLONE,
  SET_TASK_EXPIRED,
  SET_TASK_TO_SHOW_INFO,
} from "../actionsTypes";

const LOCAL_STORAGE_TASKS_KEY = "myTasks";

export const initialTask = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_TASKS_KEY)
) || {
  tasks: [],
  newTask: {
    title: "",
    description: "",
    status: "New Requests",
    assigned: "1683878575019",
    priority: "Low",
  },
  selectedTask: null,
  taskToShowInfo: null,
  selectedSort: "byPriority",
  selectedStatus: "All",
  showModal: false,
  searchValue: "",
};

export function tasksReducer(state = initialTask, action) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  let minutes = "";
  currentDate.getMinutes() < 10
    ? (minutes = "0" + currentDate.getMinutes())
    : (minutes = currentDate.getMinutes());
  const monthName = months[month];
  let newState;

  switch (action.type) {
    case SET_NEW_COMMENT:
      const { commentTaskId, commentToAdd, commentUserToAdd } = action.payload;
      const commentAddDate =
        day + " " + monthName + " " + year + " " + hours + ":" + minutes;
      const commentIdtoAdd = currentDate.getTime();
      const newCommentToAdd = {
        commentText: commentToAdd,
        commentUser: commentUserToAdd,
        commentTime: commentAddDate,
        commentId: commentIdtoAdd,
      };
      newState = {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === commentTaskId) {
            return {
              ...task,
              comment: [...task.comment, newCommentToAdd],
              newComment: " ",
            };
          }
          return task;
        }),
      };
      if (
        state.taskToShowInfo !== null &&
        state.taskToShowInfo.id === commentTaskId
      ) {
        newState.taskToShowInfo = {
          ...newState.taskToShowInfo,
          comment: [...newState.taskToShowInfo.comment, newCommentToAdd],
          newComment: "",
        };
      }
      break;

    case COMMENT_INPUT_CHANGE:
      newState = {
        ...state,
        tasks: [...state.tasks],
      };
      const newTaskComment = action.payload;
      const commentTaskIndex = newState.tasks.findIndex(
        (task) => task.id === newTaskComment.id
      );
      newState.tasks[commentTaskIndex] = newTaskComment;
      break;

    case SET_SELECTED_SORT:
      newState = {
        ...state,
        selectedSort: action.payload,
      };
      break;

    case SET_TASK_EXPIRED:
      newState = {
        ...state,
        tasks: state.tasks.map((task) => {
          const deadlineDate = new Date(task.deadline);
          const remainingTime = deadlineDate.getTime() - currentDate.getTime();
          if (remainingTime <= 0 && task.status !== "Expired") {
            if (task.isApproved) {
              return {
                ...task,
                status: "Complete",
              };
            } else {
              return {
                ...task,
                status: "Expired",
              };
            }
          }
          return task;
        }),
      };
      break;

    case SET_TASK_CLONE:
      newState = {
        ...state,
        tasks: [...state.tasks],
      };
      const taskToClone = action.payload;
      const clonedTask = {};
      const taskDate =
        day + " " + monthName + " " + year + " " + hours + ":" + minutes;
      const cloneId = currentDate.getTime();
      clonedTask.id = cloneId;
      clonedTask.filterDate = currentDate;
      clonedTask.date = taskDate;
      clonedTask.title = taskToClone.title;
      clonedTask.description = taskToClone.description;
      clonedTask.status = taskToClone.status;
      clonedTask.priority = taskToClone.priority;
      clonedTask.deadline = taskToClone.deadline;
      clonedTask.assigned = taskToClone.assigned;
      clonedTask.newComment = "";
      clonedTask.comment = [];
      newState.tasks.push(clonedTask);
      break;

    case SET_SEARCH_VALUE:
      newState = {
        ...state,
        searchValue: action.payload.toLowerCase(),
      };
      break;

    case SET_SHOW_MODAL:
      newState = {
        ...state,
        showModal: action.payload,
      };
      break;

    case SET_SELECTED_STATUS:
      const status = action.payload;

      newState = {
        ...state,

        selectedStatus: status,
      };

      break;

    case SET_NEW_TASK:
      newState = {
        ...state,
        tasks: [...state.tasks],
      };

      const taskToAdd = action.payload;
      const index = newState.tasks.findIndex(
        (task) => task.id === taskToAdd.id
      );
      if (index === -1) {
        const taskDate =
          day + " " + monthName + " " + year + " " + hours + ":" + minutes;
        const newId = currentDate.getTime();
        taskToAdd.comment = [];
        taskToAdd.newComment = "";
        taskToAdd.id = newId;
        taskToAdd.filterDate = currentDate;
        taskToAdd.date = taskDate;
        newState.tasks.push(taskToAdd);
      } else {
        newState.tasks[index] = taskToAdd;
        if (
          state.taskToShowInfo !== null &&
          state.taskToShowInfo.id === taskToAdd.id
        ) {
          newState.taskToShowInfo = taskToAdd;
        }
      }

      break;

    case CLEAR_NEW_TASK:
      newState = {
        ...state,
        newTask: {
          title: "",
          description: "",
          status: "New Requests",
          assigned: "1683878575019",
          priority: "Low",
        },
      };
      break;

    case SET_SELECTED_TASK:
      newState = {
        ...state,
        selectedTask: action.payload,
        newTask: action.payload,
      };
      break;

    case SET_TASK_TO_SHOW_INFO:
      newState = {
        ...state,
        taskToShowInfo: action.payload,
      };
      break;

    case INPUT_CHANGE:
      const { value, name } = action.payload;
      newState = {
        ...state,
        newTask: {
          ...state.newTask,
          [name]: value,
        },
      };
      break;

    case SET_STATUS_DND:
      const { newStatus, dndId } = action.payload;
      const newId = Number(dndId);
      const now = Date.now();
      newState = {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === newId) {
            if (newStatus === "Expired") {
              return {
                ...task,
                status: newStatus,
                deadline: currentDate,
              };
            } else if (newStatus === "New Requests") {
              return {
                ...task,
                isApproved: false,
                status: newStatus,
              };
            } else if (newStatus === "Complete") {
              if (task.isApproved) {
                return {
                  ...task,
                  status: newStatus,
                  deadline: "Complete",
                };
              } else {
                return {
                  ...task,
                  status: task.status,
                };
              }
            } else if (task.deadline === "Complete") {
              return {
                ...task,
                status: "Complete",
              };
            } else if (task.deadline - now < 0) {
              return {
                ...task,
                status: "Expired",
              };
            } else {
              return {
                ...task,
                status: newStatus,
              };
            }
          }
          return task;
        }),
      };
      break;

    case DELETE_TASK:
      newState = {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        selectedTask: null,
      };
      break;

    default:
      newState = state;
  }

  localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(newState));

  return newState;
}
