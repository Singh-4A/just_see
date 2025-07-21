import axios from "axios";

export const LoginApi = async (payload) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.API_END_POINT}auth/login`,
      data: payload
    });
    return response;
  } catch (error) {
    return error
  }

};
