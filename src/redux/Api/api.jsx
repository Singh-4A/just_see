import axios from "axios";

export const createTodoApi = async (props) => {
  try {
    const createTodo = await axios({
      method: "post",
      url: `${process.env.API_END_POINT}todo`,
      data: {
        name: props.inputValue,
      },
    });
    return createTodo;
  } catch (error) {
    console.log(error);
  }
};
