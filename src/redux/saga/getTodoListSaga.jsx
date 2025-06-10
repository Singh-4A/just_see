import { put, takeEvery, call } from "redux-saga/effects";
import { getTodoApi } from "../Api/getTotoListApi";
import {
  getSuccessTodoList,
  getFailTodoList,
  getResetTodoList,
} from "../Action/getTodoAction";

function* fetchTodoDataSaga(action) {
  try {
    const response = yield call(getTodoApi, action.payload);
    // yield put(getResetTodoList(response.data));
    yield put(getSuccessTodoList(response.data));
  } catch (error) {
    yield put(getFailTodoList(error.message));
  }
}

function* getTodoRootSaga() {
  yield takeEvery("GET_TODO_LIST_DATA", fetchTodoDataSaga);
}

export default getTodoRootSaga;
