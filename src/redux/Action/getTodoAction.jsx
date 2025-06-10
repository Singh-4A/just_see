export const GET_TODO_LIST_DATA = "GET_TODO_LIST_DATA";
export const GET_SUCCESS_TODO_LIST_DATA = "GET_SUCCESS_TODO_LIST_DATA";
export const GET_FAIL_TODO_LIST_DATA = "GET_FAIL_TODO_LIST_DATA";
export const GET_RESET_TODO_LIST_DATA = "GET_RESET_TODO_LIST_DATA";

export const getTodoList = (payload) => ({ type: GET_TODO_LIST_DATA, payload });

export const getSuccessTodoList = (payload) => ({
  type: GET_SUCCESS_TODO_LIST_DATA,
  payload,
});
export const getFailTodoList = (payload) => ({
  type: GET_FAIL_TODO_LIST_DATA,
  payload,
});

export const getResetTodoList = (payload) => ({
  type: GET_RESET_TODO_LIST_DATA,
  payload,
});