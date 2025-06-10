import { put, takeEvery, call } from "redux-saga/effects";

import {
  deleteSuccessTodo,
  deleteSuccessFail,
} from "../Action/deleteTodo";
import { deleteTodoApi } from "../Api/deleteTodoApi";

function* fetchTodoDeleteDataSaga(action) {
  try {
    const response = yield call(deleteTodoApi, action.payload);
    yield put(deleteSuccessTodo(response.data));
  } catch (error) {
    yield put(deleteSuccessFail(error.message));
  }
}

function* deleteTodoSaga() {
  yield takeEvery("DELETE_TODO", fetchTodoDeleteDataSaga);
}

export default deleteTodoSaga;
