import React from "react";

function Todo(props) {
  const {
    addTodo = [],
    deleteTodoHandler = () => {},
    editTodoListHandler = () => {},
    visible = false,
    editText = "",
    inputValue = "",
    setEditText = () => {},
    setInputValue = () => {},
    addTodoHandler = () => {},
  } = props;
  return (
    <div>
      <div
        style={{
          width: "300px",
          // margin: "auto",
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
                <button onClick={() => editTodoListHandler(index)}>Edit</button>
              </div>
            </div>
          </>
        );
      })}
      </div>
   
    </div>
  );
}

export default Todo;
