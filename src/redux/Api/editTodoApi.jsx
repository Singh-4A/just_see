import axios from "axios";

export const editTodoApi = async (props) => {
  const { id, name } = props;

  try {
    const response = await axios({
      method: "put",
      url: `${process.env.API_END_POINT}todo/${id}`,
      data: {
        name: name,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
