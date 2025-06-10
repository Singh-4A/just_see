import axios from "axios";

export const deleteTodoApi = async (id) => {
  try {
    const response = await axios.delete(`${process.env.API_END_POINT}todo/${id}`);

    return response;
  } catch (error) {
    console.log(error);
  }
};
