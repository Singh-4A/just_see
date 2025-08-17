import axios from "axios";

export const createTodoApi = async (props) => {
  const token = JSON.parse(localStorage.getItem("token"))?.token
  try {
    const createTodo = await axios({
      method: "post",
      url: `${process.env.API_END_POINT}todo`,
      data: {
        name: props.inputValue,
        skill: props.selectChip,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return createTodo;
  } catch (error) {
    return error.response.data || "something went wrong!"

  }
};
