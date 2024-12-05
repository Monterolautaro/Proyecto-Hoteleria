import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const cancelBooking = async (bookId: string, token: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/bookings/soft-delete/${bookId}`,
      { note: "Cancelado" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Toast.fire({
      title: response.data.message,
      icon: "success",
    });

    return true;
  } catch (error: any) {
    Swal.fire({
      title: error.message,
      icon: "error",
    });
  }
};

export default cancelBooking;
