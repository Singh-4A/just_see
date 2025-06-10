import axios from "axios";

export const getTodoApi = async (params) => {
  try {
    const getList = await axios.get("http://localhost:500/todo", {
      params: params,
    });

    return getList;
  } catch (error) {
    console.log(error);
  }
};
