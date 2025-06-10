import {
  EDIT_TODO,
  EDIT_SUCCESS_TODO,
  EDIT_FAIL_TODO,
} from "../Action/editTodoAction";

const initialState = {
  status: "",
  list: [],
};

const editTodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_TODO:
      return {
        ...state,
        status: "pending",
        list: [],
      };

    case EDIT_SUCCESS_TODO:
      return {
        ...state,
        status: "success",
        list: [...state.list, ...action.payload],
      };
    case EDIT_FAIL_TODO:
      return {
        ...state,
        status: "error",
        list: [],
      };

    default:
      return state;
  }
};

export default editTodoReducer;
