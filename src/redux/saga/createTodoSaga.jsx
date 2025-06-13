import { put, takeEvery, call } from "redux-saga/effects";
import { createTodoApi } from "../Api/api";
import { createTodoSuccess, createTodoFail } from "../Action/action";

function* fetchDataSaga(action) {
  try {
    const response = yield call(createTodoApi, action.payload);
    yield put(createTodoSuccess(response.data));
  } catch (error) {
    yield put(createTodoFail(response?.data));
  }
}

function* rootSaga() {
  yield takeEvery("CREATE_TODO", fetchDataSaga);
}

export default rootSaga;
