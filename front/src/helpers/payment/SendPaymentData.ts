import { IStripeData } from "@/interfaces/paymentData";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SendPaymentData = async (data: IStripeData) => {
  try {
    
    const response = await axios.post(`${API_URL}/stripe/create-payment`, data);
    if (response) return response.data.status;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      Swal.fire({
        title: "We cannot proccess your payment at the moment",
        icon: "error",
      });
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};
