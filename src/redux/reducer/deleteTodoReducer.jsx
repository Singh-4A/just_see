import {
  DELETE_TODO,
  DELETE_SUCCESS_TODO,
  DELETE_FAIL_TODO,
} from "../Action/deleteTodo";

const initialValue = {
  status: "pending",
};

const deleteReducer = (state = initialValue, action) => {
  switch (action.type) {
    case DELETE_TODO:
      return {
        ...state,
        status: "pending",
      };

    case DELETE_SUCCESS_TODO:
      return {
        ...state,
        status: "success",
      };

    case DELETE_FAIL_TODO:
      return {
        ...state,
        status: "fail",
      };

    default:
      return state;
  }
};

export default deleteReducer;
