import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const changeEmail = async (email: string, id: string, token: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/changeEmail/${id}`,
      email,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const changeUsername = async (
  username: string,
  id: string,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/changeUsername/${id}`,
      username,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
