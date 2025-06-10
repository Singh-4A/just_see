export const EDIT_TODO = "EDIT_TODO";
export const EDIT_SUCCESS_TODO = "EDIT_SUCCESS_TODO";
export const EDIT_FAIL_TODO = "EDIT_FAIL_TODO";

export const editTodo = (payload) => ({ type: EDIT_TODO, payload });

export const editSuccessTodo = (payload) => ({
  type: EDIT_SUCCESS_TODO,
  payload,
});

export const editFailTodo = (payload) => ({
  type: EDIT_FAIL_TODO,
  payload,
});
