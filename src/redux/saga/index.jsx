import { all, fork } from "redux-saga/effects";
import createTodoSaga from "./createTodoSaga";
import getTodoListSaga from "./getTodoListSaga";
import deleteTodoSaga from "./deleteTodoSaga";
import editTodoSaga from "./editTodoSaga";

function* rootSaga() {
  yield all([
    fork(createTodoSaga),
    fork(getTodoListSaga),
    fork(deleteTodoSaga),
    fork(editTodoSaga)
  ]);
}

export default rootSaga;
