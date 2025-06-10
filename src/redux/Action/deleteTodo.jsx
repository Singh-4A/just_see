export const DELETE_TODO = "DELETE_TODO";
export const DELETE_SUCCESS_TODO = "DELETE_SUCCESS_TODO";
export const DELETE_FAIL_TODO = "DELETE_FAIL_TODO";

export const deleteTodo = (payload) => ({
  type: DELETE_TODO,
  payload,
});

export const deleteSuccessTodo = (payload) => ({
  type: DELETE_SUCCESS_TODO,
  payload: payload,
});

export const deleteSuccessFail = (payload) => ({
  type: DELETE_FAIL_TODO,
  payload: payload,
});
