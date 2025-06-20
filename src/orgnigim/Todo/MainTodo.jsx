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
import Typography from "@mui/material/Typography";
import { editTodoApi } from "../../redux/Api/editTodoApi";


const MainTodo = () => {
  // this state handel for input value
  const {
    loading: getLoading = "",
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
  const [selectChip, setSelectChip] = useState([])


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
      setAddTodoValue(addTodoValue.filter((item, index) => item?._id !== id));

    },
    [addTodoValue]
  );

  const editHandler = (id) => {
    const editText = addTodoValue.find((item, i) => item._id === id);
    setEditField(editText?.name);
    setEditInputField(true);
    setCurrentIndex(id);
  };

  const addEditHandler = async () => {
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
      let response = await editTodoApi({
        id,
        name: editField,
        skill: selectChip
      }
      );

      if (response.status === 200) {
        setAddTodoValue(editData);
        setEditField("");
        setEditInputField(false);
        dispatch(
          getTodoList({
            limit: 20,
            page: page,
          })
        );
      }

    }
  };

  const completeHandler = ({ current_value, current_index }) => {
    const completeTask = addTodoValue.find((_, i) => i === current_index);
  };

  const handleFetchData = async () => {
    try {
      const response = await createTodoApi({ inputValue, selectChip })
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
    // Optionally else: log a warning if data format is invalid]
    return () => setAddTodoValue([]);
  }, [getLoading, todosFromApi]);
  useEffect(() => {
    dispatch(getTodoList({ limit: 20, page }));
  }, [page, dispatch]);




  const autoScrollPaginationHandler = (e) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    const remainingHeight = scrollHeight - (scrollTop + clientHeight);
    if (remainingHeight <= 0 && addTodoValue.length < totalCount) {
      setPage((prev) => prev + 1);
    }
  };

  // const chip = [{ skill: "react js", id: 1 }, { skill: "javascript", id: 2 }, { id: 3, skill: "css" }, { skill: "material ui", id: 4 }, { skill: "bootstarp", id: 5 }, { skill: "html", id: 6 }, { skill: "telwindcss", id: 7 }]
  const chips = ["react js", "javascript", "css", "material ui", "tailwindcss", "html"];
  return (
    <>

      <div style={{
        backgroundColor: '#e8e4e4'
      }}>
        <div className="todo_box">
          <div
            style={{
              // display: "flex",
              justifyContent: "center",
              width: "80%",
              padding: 10,
              margin: 'auto'
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showingEditInputField ? addEditHandler() : addValueHandler();
              }}
            >
              <input
                className="border border-blue-700 rounded-full  px-2 py-1 w-full"
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

            <div className="flex flex-row basis-64  gap-1 flex-wrap cursor-pointer text-color-white  mt-3">
              {
                chips.map((item, index) => {
                  return <div key={index}> <div onClick={() => {
                    setSelectChip((prev) => selectChip.includes(item) ? prev.filter(chip => chip !== item) : [...prev, item])
                  }} className={` ${selectChip.includes(item) ? " bg-cyan-500 border-2 border-black-500 font-[400]     border-2 border-black-500  rounded-[8px] w-20 text-center basis-50 " : "border-2 border-black-500 font-[400] bg-gray-400    border-2 border-black-500  rounded-[8px] w-20 text-center basis-50 "}`}>{item}</div >

                  </div>

                })
              }
              <button
                className="border border-blue-700 rounded-[10px]  w-[100px] py-1"
                onClick={
                  showingEditInputField
                    ? addEditHandler // When editing
                    : handleFetchData // When adding
                }
              >
                {showingEditInputField ? "Edit" : "Add"}
              </button>
            </div>

          </div>

        </div>
      </div >

      <TodoList
        getLoading={getLoading}
        todos={addTodoValue}
        removeHandler={removeHandler}
        editHandler={editHandler}
        completeHandler={completeHandler}
        autoScrollPaginationHandler={autoScrollPaginationHandler}
      />
    </>



  );
};

export default memo(MainTodo);
