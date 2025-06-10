import {
  GET_TODO_LIST_DATA,
  GET_SUCCESS_TODO_LIST_DATA,
  GET_FAIL_TODO_LIST_DATA,
  GET_RESET_TODO_LIST_DATA,
} from "../Action/getTodoAction";

const initialState = {
  loading: false,
  list: [],
  error: null,
};
function getTodoListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODO_LIST_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_SUCCESS_TODO_LIST_DATA:
      return {
        ...state,
        data: [...state.list, ...action.payload.data],
        totalCount: action.payload.pagination?.totalItems,
        loading: false,
      };

    case GET_FAIL_TODO_LIST_DATA:
      return {
        state,
        data: null,
        loading: "Error",
      };

    case GET_RESET_TODO_LIST_DATA:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

export default getTodoListReducer;
