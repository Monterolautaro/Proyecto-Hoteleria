import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SendPaymentData = async (id: string, amount: number) => {
  axios
    .post(`${API_URL}/stripe/create-payment-intent`, {
      id,
      amount,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error.response.data);
    });
};
