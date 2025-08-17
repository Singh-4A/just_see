import axios from "axios";

export const editTodoApi = async (props) => {
  const token = JSON.parse(localStorage.getItem("token"))?.token

  const { id, name, skill } = props;

  try {
    const response = await axios({
      method: "put",
      url: `${process.env.API_END_POINT}todo/${id}`,
      data: {
        name: name,
        skill: skill
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
