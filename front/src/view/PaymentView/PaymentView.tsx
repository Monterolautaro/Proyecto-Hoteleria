/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDateContext } from "@/helpers/hotelDetail/dateContext";
import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import { SendPaymentData } from "@/helpers/payment/SendPaymentData";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { differenceInDays } from "date-fns";
import { useEffect } from "react";

const PaymentView: React.FC<{ params: string }> = ({ params }) => {
  const { startDateContext, endDateContext, people } = useDateContext(); //Fechas y numero de personas
  const { bookingRooms } = useRoomsContext(); //Numero de habitaciones
  const { bookingPrice } = usePriceContext();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe no está disponible");
      return;
    }

    const cardElement = elements?.getElement(CardElement);
    if (!cardElement) {
      console.log("Error getting CardElement");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("[Error on createPaymentMethod]", error.message);
    } else {
      console.log("[PaymentMethod created]", paymentMethod);
      const { id } = paymentMethod;
      const totalPrice = bookingPrice.reduce((ac, index) => ac + index, 0);
      const response = await SendPaymentData(id, totalPrice);
    }
  };

  useEffect(() => {
    console.log(startDateContext, endDateContext);
  }, [startDateContext]);

  return (
    <div className="w-full">
      <div className="text-lg h-[50dvh] p-6">
        <h2 className="text-xl font-bold">Booking details</h2>
        <h3 className="font-bold">{decodeURIComponent(params)}</h3>
        <h3>
          <span className="font-semibold">Start date:</span>{" "}
          {startDateContext?.toLocaleDateString()}{" "}
          <span className="font-semibold"> - End date:</span>{" "}
          {endDateContext?.toLocaleDateString()}
        </h3>
        <h3>
          <span className="font-semibold">Total rooms: </span>
          {bookingRooms.reduce((acc, price) => acc + price, 0)} rooms for{" "}
          <span>
            {differenceInDays(endDateContext!, startDateContext!)} nights
          </span>
        </h3>
        <h3>
          <span className="font-semibold">N° Travelers:</span> {people}
        </h3>
        <h3 className="font-bold text-xl">
          Total: {bookingPrice.reduce((ac, index) => ac + index, 0)} COP
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="w-[40%] bg-slate-400 m-auto">
        <CardElement className="p-3 border " />
      </form>
    </div>
  );
};

export default PaymentView;
