import { call, takeEvery, put } from "redux-saga/effects";
import { editTodoApi } from "../Api/editTodoApi";
import { editFailTodo, editSuccessTodo } from "../Action/editTodoAction";

function* fetchEditSaga(action) {
  try {
    const response = yield call(editTodoApi, action.payload);
    yield put(editSuccessTodo(response.data));
  } catch (error) {
    yield put(editFailTodo(error));
  }
}

function* editTodoSaga() {
  yield takeEvery("EDIT_TODO", fetchEditSaga);
}

export default editTodoSaga;
