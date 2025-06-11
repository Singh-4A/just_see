import axios from "axios";

export const getTodoApi = async (params) => {
  try {
    const getList = await axios.get(`${process.env.API_END_POINT}todo`, {
      params: params,
    },
  );

    return getList;
  } catch (error) {
    console.log(error);
  }
};
