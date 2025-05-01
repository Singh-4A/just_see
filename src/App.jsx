import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
// import ProgressBar from "./progress";
import Todo from "./Todo/todo";
import Navbar from "./nabvar/Navbar";

function App() {
  // State for progress bar value
  // Ref to store interval ID for cleanup
  // const intervalId = useRef(null);

  // List used for infinite scroll
  const [list, setList] = useState([...new Array(50)]);
  const [loading, setLoading] = useState(false);

  // Custom map function added to Array prototype (use with caution in production)
  Array.prototype.myMap = function (callback) {
    if (typeof callback !== "function") {
      return TypeError("myMap error:undefined is myMap function");
    }
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };

  const parentStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

  const THRESHOLD = 20;

  // Handler for infinite scroll when user reaches bottom
  const onScrollHandler = (event) => {
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = event.target.scrollTop;
    const clientHeight = event.target.clientHeight;

    const remainingHeight = scrollHeight - (scrollTop + clientHeight);
    if (remainingHeight < THRESHOLD) {
      setTimeout(() => {
        setList((prev) => [...prev, ...new Array(10)]);
        setLoading(true);
      }, 300);
    }
    setLoading(false);
  };

  // Todo app state
  const [inputValue, setInputValue] = useState("");
  const [addTodo, setAddTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [visible, setVisible] = useState(false);

  // Handler to add a new todo or save an edited one

  const addTodoHandler = () => {
    if (inputValue?.trim() !== "" && !editText) {
      setInputValue("");
      setAddTodo([...addTodo, inputValue]);
    } else {
      saveTodo(); // Save the edited todo
    }
  };

  // Delete todo by filtering out the selected index
  const deleteTodoHandler = useCallback(
    (index) => {
      const filterTodoList = addTodo.filter((_, i) => i !== index);
      setAddTodo(filterTodoList);
      setEditIndex("");
      setEditText("");
      setVisible(false);
    },
    [addTodo]
  );
  ("");

  // Load the selected todo into the input field for editing
  const editTodoListHandler = useCallback(
    (index) => {
      const currentEditText = addTodo.find((_, i) => i === index);
      setEditText(currentEditText);
      setEditIndex(index);
      setVisible(true);
    },
    [addTodo]
  );

  // Save the edited todo back to the list
  function saveTodo() {
    const updatedTodoList = addTodo.map((item, i) =>
      editIndex === i ? editText : item
    );
    setAddTodo(updatedTodoList);
    setEditText("");
    setEditIndex(null);
    setVisible(false);
  }

  const peakElement = [1, 2, 3, 4, 9, 5, 6, 90];

  function peak(arr) {
    const num = arr.length;
    if (num === 0) return 1;
    for (let i = 0; i < num; i++) {
      const left = i === 0 || arr[i] >= arr[i - 1];
      const right = i === -num || arr[i] >= arr[i + 1];
      if (left && right) {
        return arr[i];
      }
    }

    return -1;
  }

  console.log(peak(peakElement));

  const array1 = [1, 2, 3, 4];

  // 0 + 1 + 2 + 3 + 4
  const initialValue = 0;
  const sumWithInitial = array1.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  // Expected output: 10

  // Count frequency of elements in array

  const countFrequency = [
    "apple",
    "mango",
    "apple",
    "mango",
    "apple",
    "apple",
    "mango",
  ].reduce((accumulator, currentItem) => {
    accumulator[currentItem] = (accumulator[currentItem] || 0) + 1;
    return accumulator;
  }, {});

  function string(value) {
    let reverse = "";
    for (let i = value.length - 1; i > 0; i--) {
      reverse += value[i];
    }
    return reverse;
  }

  const flatten = [1, [2], [4, [5, [6]]]];

  function flattenArray(array) {
    const result = [];
    if (Array.isArray(array)) {
      array.map((item) => result.push(...flattenArray(item)));
    }else{
      result.push(array)
    }
    return result
  }

  console.log(flattenArray(flatten));

  return (
    <>
      <Navbar />
      {/* Progress Bar Section */}

      {/* Infinite Scroll Section */}
      <div style={parentStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div
            onScroll={onScrollHandler}
            style={{
              height: "300px",
              overflow: "auto",
              marginTop: "20px",
              width: "300px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {list.myMap((item, i) => {
              return (
                <li
                  key={i}
                  style={{
                    backgroundColor: "beige",
                    listStyle: "none",
                    border: "1px solid white",
                    height: "30px",
                  }}
                >
                  {i + 1}unique
                </li>
              );
            })}
            {loading && "Loading"}
          </div>
          <Todo
            addTodo={addTodo}
            inputValue={inputValue}
            setEditText={setEditText}
            setInputValue={setInputValue}
            addTodoHandler={addTodoHandler}
            editText={editText}
            deleteTodoHandler={deleteTodoHandler}
            editTodoListHandler={editTodoListHandler}
            visible={visible}
          />
        </div>
      </div>
    </>
  );
}

export default App;
