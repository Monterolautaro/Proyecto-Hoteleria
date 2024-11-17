import { IHotelDetail } from "@/interfaces";
import axios from "axios";

const getHotelById = async (id: string) => {
  try {
    const hotelInfo: IHotelDetail | undefined = await axios.get(
      `http://localhost:3000/hotels/${id}`
    );
    return hotelInfo;
  } catch (error) {
    console.log(error);
  }
};

export default getHotelById;
