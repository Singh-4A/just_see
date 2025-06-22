import { createContext, useCallback, useReducer } from "react";



export const createContextData = createContext();

const intialValue = { count: 0 }

function reducer(state, action) {

  switch (action.type) {
    case "INCREMENT": return {
      count: state.count + 1
    }
    case "DECREMENT": return {
      count: state.count - 1
    }
    default: return state

  }

}

export function ContextApi({ children }) {
  const [currentValue, dispatch] = useReducer(reducer, intialValue)


  const increment = useCallback(() => {
    dispatch({ type: "INCREMENT" })
  },
    [currentValue?.count])

  const decremnet = useCallback(() => {
    dispatch({ type: "DECREMENT" })
  }, [currentValue?.count])

  let value = {
    currentValue: currentValue?.count,
    countIncrement: increment,
    countDecrement: decremnet
  }

  return <createContextData.Provider value={value}>
    {children}
  </createContextData.Provider>

}