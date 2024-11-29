import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getUserData = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getUserData;
