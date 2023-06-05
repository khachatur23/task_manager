import { applyMiddleware, combineReducers, createStore } from "redux";
import { initialTask, tasksReducer } from "./features/tasksSlice";
import { initialUser, usersReducer } from "./features/usersSlice";

const myMiddleware = (store) => (next) => (action) => {
  return next(action);
};

const initialState = {
  tasks: initialTask,
  users: initialUser,
};

const store = createStore(
  combineReducers({
    tasks: tasksReducer,
    users: usersReducer,
  }),
  initialState,
  applyMiddleware(myMiddleware)
);
export default store;
