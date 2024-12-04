import { UsersBookings } from "@/interfaces/bookings";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getBookingsByUserId = async (id: string): Promise<UsersBookings[] | undefined> => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_URL}/users/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching bookings by user ID:", error);
  }
};

export default getBookingsByUserId;
