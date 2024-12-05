import { IUser } from "@/interfaces/bookings";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getUserById = async (id: string): Promise<IUser | undefined> => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userInfo = response?.data;
    return userInfo;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
  }
};

export default getUserById;
