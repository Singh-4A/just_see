import axios from "axios";

export const createTodoApi = async (props) => {
  try {
    const createTodo = await axios({
      method: "post",
      url: "http://localhost:500/todo",
      data: {
        name: props.inputValue,
      },
    });
    return createTodo;
  } catch (error) {
    console.log(error);
  }
};
