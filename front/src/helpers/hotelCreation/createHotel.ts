import { IHotelCreation } from "@/interfaces/hotelCreation";
import axios from "axios";

 const API_URL = process.env.NEXT_PUBLIC_API_URL;
 

 const createHotel = async (hotelData: IHotelCreation) => {
 try {
   const response = await axios.post(`${API_URL}/hotels/create`, hotelData);
   if (response.status === 200) {
     console.log('Hotel creado correctamente');
   } else {
     console.error('Error al crear el hotel:', response.status, response.data);
   }
 } catch (error) {
   console.error('Error al crear el hotel:', error);
 }
 };

 export default createHotel;
