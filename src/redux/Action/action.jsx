export const CREATE_TODO = "CREATE_TODO";
export const CREATE_TODO_SUCCESS = "CREATE_TODO_SUCCESS";
export const CREATE_TODO_FAIL = "CREATE_TODO_FAIL";

// actions.ts
export const createTodo = (payload) => ({ type: CREATE_TODO, payload });

export const createTodoSuccess = (payload) => ({
  type: CREATE_TODO_SUCCESS,
  payload,
});

export const createTodoFail = (error) => ({
  type: CREATE_TODO_FAIL,
  payload: error,
  error: true,
});
