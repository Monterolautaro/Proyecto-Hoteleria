import { IStripeData } from "@/interfaces/paymentData";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SendPaymentData = async (data: IStripeData) => {
  try {
    const response = await axios.post(`${API_URL}/stripe/create-payment`, data);
    if (response) return response.data;
    console.log('esto es lo que responde el backend', response);
    
  } catch (error: any) {
    if (error.response && error.response.data) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};
