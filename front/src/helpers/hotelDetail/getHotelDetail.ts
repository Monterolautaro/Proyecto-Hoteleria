import { IHotel } from "@/interfaces";
import axios from "axios";
import { config} from "dotenv";
config({path: '.env'});

const API_URL = process.env.API_URL;

const getHotelById = async (id: string): Promise<IHotel | undefined> => {
  try {

    const response = await axios.get(`${API_URL}/hotels/${id}`);
    const hotelInfo = response?.data;
    return hotelInfo;
  } catch (error) {
    console.log(error);
  }
};

export default getHotelById;
