import axios from "axios";

export const editTodoApi = async (props) => {
  const { id, name } = props;

  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:500/todo/${id}`,
      data: {
        name: name,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
