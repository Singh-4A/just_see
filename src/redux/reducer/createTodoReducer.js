import {
  CREATE_TODO,
  CREATE_TODO_FAIL,
  CREATE_TODO_SUCCESS,
} from "../Action/action";

// i am gonna write here initialState
let initialState = { status: "", list: [], error: null };
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      return { ...state, status: "pending", error: null };

    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        status: "success",
        list: [...state.list, action.payload.data],
        error: null,
      };

    case CREATE_TODO_FAIL:
      return { ...state, status: "error", error: action.payload };

    default:
      return state; // ✅ correct
  }
}

export default todoReducer;
