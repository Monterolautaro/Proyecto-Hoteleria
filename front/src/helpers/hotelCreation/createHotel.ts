import { IHotelCreation } from "@/interfaces/hotelCreation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const createHotel = async (hotelData: IHotelCreation) => {
  console.log(hotelData);
  try {
    const response = await axios.post(`${API_URL}/create`, hotelData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default createHotel;
