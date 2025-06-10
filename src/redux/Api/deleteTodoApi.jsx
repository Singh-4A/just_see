import axios from "axios";

export const deleteTodoApi = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:500/todo/${id}`);

    return response;
  } catch (error) {
    console.log(error);
  }
};
