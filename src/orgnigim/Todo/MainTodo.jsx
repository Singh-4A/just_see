import React, { memo, useCallback, useEffect, useState } from "react";
import "./mainTodo.css";
import TodoList from "../../Todo/todo";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../redux/Action/action";
import {
  getTodoList,
} from "../../redux/Action/getTodoAction";
import { deleteTodo } from "../../redux/Action/deleteTodo";
import { editTodo } from "../../redux/Action/editTodoAction";
import { useSnackbar } from "notistack";
import { createTodoApi } from "../../redux/Api/api";


const MainTodo = () => {
  // this state handel for input value
  const {
    loading: getLoading = false,
    data: todosFromApi = [],
    totalCount,
  } = useSelector((state) => state.getTodoListState) ?? { data: [] };
  const { status = "" } = useSelector((state) => state.deleteTodoState) ?? {};

  const { status: faliCreateTodo = "", } = useSelector((state) => state.todoState)
  const [inputValue, setInputValue] = useState("");
  // store current input value for in array using this state
  const [addTodoValue, setAddTodoValue] = useState([]);
  // edit state
  const [editField, setEditField] = useState("");
  const [showingEditInputField, setEditInputField] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [complete, setComplete] = useState(false);
  const [page, setPage] = useState(1);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();



  const addValueHandler = useCallback(() => {
    if (inputValue?.trim()) {
      setAddTodoValue((prev) => {
        return [...prev, inputValue];
      });
      setInputValue("");
    }
  }, [inputValue]);

  const removeHandler = useCallback(
    (id) => {
      dispatch(deleteTodo(id));
    },
    [addTodoValue]
  );

  const editHandler = (id) => {
    const editText = addTodoValue.find((item, i) => item._id === id);
    setEditField(editText?.name);
    setEditInputField(true);
    setCurrentIndex(id);
  };

  const addEditHandler = () => {
    if (editField.trim()) {
      const editData = addTodoValue.map((item, i) => {
        return item?._id === currentIndex
          ? {
            name: editField,
            _id: item._id,
          }
          : item;
      });

      const id = editData.find((item, i) => item._id === currentIndex)?._id;
      dispatch(
        editTodo({
          id,
          name: editField,
        })
      );
      setAddTodoValue(editData);
      setEditField("");
      setEditInputField(false);
    }
  };

  const completeHandler = ({ current_value, current_index }) => {
    const completeTask = addTodoValue.find((_, i) => i === current_index);
  };

  const handleFetchData = async () => {
    try {
      const response = await createTodoApi({ inputValue })
      addValueHandler();
      if (response?.status === 200) {

        setAddTodoValue([]);
        dispatch(
          getTodoList({
            limit: 20,
            page: page,
          })
        );
      } else {
        enqueueSnackbar(response?.message, {
          variant: 'error'
        })
      }

    } catch (error) {

    }



  };


  useEffect(() => {
    if (!getLoading && Array.isArray(todosFromApi)) {
      setAddTodoValue((prev) => [...prev, ...todosFromApi]);
    }
    // Optionally else: log a warning if data format is invalid
  }, [getLoading, todosFromApi]);
  useEffect(() => {
    dispatch(getTodoList({ limit: 20, page }));
  }, [page, dispatch]);

  useEffect(() => {
    if (status === "success") {
      dispatch(
        getTodoList({
          limit: 20,
          page: page,
        })
      );


      setAddTodoValue([]);
    }
  }, [status]);


  const autoScrollPaginationHandler = (e) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    const remainingHeight = scrollHeight - (scrollTop + clientHeight);

    if (remainingHeight <= 0 && addTodoValue.length < totalCount) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>


      <div >
        <div className="todo_box">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showingEditInputField ? addEditHandler() : addValueHandler();
              }}
            >
              <input
                value={showingEditInputField ? editField : inputValue}
                onChange={(e) =>
                  showingEditInputField
                    ? setEditField(e.target.value)
                    : setInputValue(e.target.value)
                }
                placeholder={
                  showingEditInputField ? "Edit todo..." : "Add todo..."
                }
              />
            </form>
            <button
              onClick={
                showingEditInputField
                  ? addEditHandler // When editing
                  : handleFetchData // When adding
              }
            >
              {showingEditInputField ? "Edit" : "Add"}
            </button>
          </div>

          <TodoList
            getLoading={getLoading}
            todos={addTodoValue}
            removeHandler={removeHandler}
            editHandler={editHandler}
            completeHandler={completeHandler}
            autoScrollPaginationHandler={autoScrollPaginationHandler}
          />
        </div>
      </div>
    </>
  );
};

export default memo(MainTodo);
