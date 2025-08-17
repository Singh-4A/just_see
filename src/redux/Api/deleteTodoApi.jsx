import axios from "axios";

export const deleteTodoApi = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))?.token

  try {
    const response = await axios.delete(`${process.env.API_END_POINT}todo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
