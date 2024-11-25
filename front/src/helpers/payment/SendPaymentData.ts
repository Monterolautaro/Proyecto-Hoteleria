import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SendPaymentData = async (id: string, amount: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/stripe/create-payment-intent`,
      {
        id,
        amount,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
