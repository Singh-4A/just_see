import axios from "axios";

export const getTodoApi = async (params) => {
  const token = JSON.parse(localStorage.getItem("token"))?.token
  try {
    const getList = await axios.get(`${process.env.API_END_POINT}todo`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    );

    return getList;
  } catch (error) {
    console.log(error);
  }
};
