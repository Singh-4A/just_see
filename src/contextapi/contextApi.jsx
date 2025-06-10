import { createContext, useCallback, useReducer } from "react";

export const createContextData = createContext();

const initialValue = {
  darkLight: false,
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "DARK":
      return { ...state, darkLight: !state.darkLight };

    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export function ContextApi({ children }) {
  const [currentValue, dispatch] = useReducer(reducer, initialValue);

  const darkHandler = useCallback(() => {
    dispatch({ type: "DARK" });
  }, []);

  const IncrementHandler = useCallback(() => {
    dispatch({ type: "INCREMENT" });
  }, []);

  const decrementHandler = useCallback(() => {
    dispatch({ type: "DECREMENT" });
  }, []);
  const value = {
    darkThemeHandler: darkHandler,
    darkTheme: currentValue.darkLight,
    countIncrement: IncrementHandler,
    currentValue: currentValue.count,
    countDecrement: decrementHandler,
  };
  return (
    <createContextData.Provider value={value}>
      {children}
    </createContextData.Provider>
  );
}
