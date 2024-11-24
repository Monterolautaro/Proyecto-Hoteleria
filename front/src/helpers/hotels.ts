import { Hotel } from "@/interfaces/hotel";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const getHotels = async (pages: number, limit: number) : Promise<Hotel[]> =>

    {
        try {
            const response = await axios.get(`${API_URL}/hotels?page=${pages}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching hotels:", error);
            throw new Error("Failed to fetch hotels")
        }
    }

    export default getHotels;