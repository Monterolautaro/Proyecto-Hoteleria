import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getUserGoogleData = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/email`, {
      email: email,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getUserGoogleData;
