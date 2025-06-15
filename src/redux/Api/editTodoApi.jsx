import axios from "axios";

export const editTodoApi = async (props) => {
  const { id, name ,skill} = props;

  try {
    const response = await axios({
      method: "put",
      url: `${process.env.API_END_POINT}todo/${id}`,
      data: {
        name: name,
        skill:skill
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
