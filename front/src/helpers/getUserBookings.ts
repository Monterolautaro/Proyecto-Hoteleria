import { UserBookings } from "@/interfaces/bookings";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getBookingsByUserId = async (id: string): Promise<UserBookings[] | undefined> => {
  try {
    const response = await axios.get(`${API_URL}/users/bookings`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching bookings by user ID:", error);
  }
};

export default getBookingsByUserId;