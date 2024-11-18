import { IHotelDetail } from "@/interfaces";
import axios from "axios";
import { config} from "dotenv";
config({path: '.env'});

const getHotelById = async (id: string) => {
  try {
    const hotelInfo: IHotelDetail | undefined = await axios.get(
      `http://localhost:${process.env.BACKEND_PORT}/hotels/${id}`
    );
    return hotelInfo;
  } catch (error) {
    console.log(error);
  }
};

export default getHotelById;
