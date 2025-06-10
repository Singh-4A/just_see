import axios from "axios";

export const LoginApi = async () => {
  const response = await axios({
    method: "post",
    url: `${process.env.API_END_POINT}/auth/login`,
  });
  return response;
};
