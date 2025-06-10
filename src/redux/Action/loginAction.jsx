export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_SUCCESS_USER = "LOGIN_SUCCESS_USER";
export const LOGIN_FAIL_USER = "LOGIN_FAIL_USER";

export const loginUser = (payload) => ({ type: LOGIN_USER, payload });

export const loginSuccessUser = (payload) => ({
  type: LOGIN_SUCCESS_USER,
  payload,
});
export const loginFailUser = (payload) => ({ type: LOGIN_FAIL_USER, payload });
