import {
  CREATE_TODO,
  CREATE_TODO_FAIL,
  CREATE_TODO_SUCCESS,
} from "../Action/action";

// i am gonna write here initialState
let initialState = { loading: false, list: [], error: null };
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      return { ...state, loading: true, error: null };

    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload.data],
        error: null,
      };

    case CREATE_TODO_FAIL:
      return { ...state, loading: false, error: action.type };

    default:
      return state; // ✅ correct
  }
}

export default todoReducer;
