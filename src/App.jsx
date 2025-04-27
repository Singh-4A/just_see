import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import ProgressBar from "./progress";

function App() {
  // State for progress bar value
  const [value, setValue] = useState(0);
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

  // Auto-increment progress bar on mount (currently commented out)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((value) => {
        if (value >= 100) {
          clearInterval(intervalId);
          return 100;
        } else {
          return value + 1;
        }
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

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

  return (
    <>
      {/* Progress Bar Section */}
      <div style={parentStyle}>
        <ProgressBar value={value} />
        {value < 100 ? "Loading" : "Complete"}
      </div>

      {/* Infinite Scroll Section */}
      <div style={parentStyle}>
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
        </div>
        {loading && "Loading"}
      </div>

      {/* Todo List Section */}
      <div
        style={{
          width: "300px",
          margin: "auto",
          background: "blue",
          height: "300px",
          overflow: "auto",
          borderRadius: "30px",
        }}
      >
        {/* Todo Input Field */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div>
            <input
              type="text"
              value={visible ? editText : inputValue}
              onChange={(e) =>
                visible
                  ? setEditText(e.target.value)
                  : setInputValue(e.target.value)
              }
            />
          </div>
          <div>
            <button onClick={() => addTodoHandler()}>
              {!visible ? "Add Todo" : "Save Todo"}
            </button>
          </div>
        </div>

        {/* Todo List Items */}
        <div>
          {addTodo.myMap((item, index) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px",
                    backgroundColor: "beige",
                    width: 255,
                    marginLeft: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                    }}
                  >
                    {item}
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        deleteTodoHandler(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <button onClick={() => editTodoListHandler(index)}>
                      Edit
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>


      </div>
    </>
  );
}

export default App;
