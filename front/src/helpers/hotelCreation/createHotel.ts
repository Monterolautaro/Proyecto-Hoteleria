import { IHotelCreation } from "@/interfaces/hotelCreation";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const createHotel = async (
  hotelData: IHotelCreation,
  token: string,
  id: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/hotels/create/${id}`,
      hotelData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      Toast.fire({
        title: response.data.message || "Hotel created successfuly",
        icon: "success",
      });
      return true;
    }
  } catch (error) {
    Swal.fire({
      title: "Error creating hotel",
      icon: "error",
    });
  }
};

export default createHotel;
