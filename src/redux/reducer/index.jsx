import { combineReducers } from "redux";
import todoReducer from "../reducer/createTodoReducer.js";
import getTodoList from "../reducer/getTodoList.jsx";
import deleteTodo from "../reducer/deleteTodoReducer.jsx";
import editTodoReducer from "../reducer/editTodoReducer.jsx";

const rootReducer = combineReducers({
  todoState: todoReducer,
  getTodoListState: getTodoList,
  deleteTodoState: deleteTodo,
  editTodoState: editTodoReducer,
});

export default rootReducer;
