/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDateContext } from "@/helpers/hotelDetail/dateContext";
import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import { SendPaymentData } from "@/helpers/payment/SendPaymentData";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PaymentView: React.FC<{ params: string }> = ({ params }) => {
  const { startDateContext, endDateContext, people } = useDateContext(); //Fechas y numero de personas
  const { bookingRooms } = useRoomsContext(); //Numero de habitaciones
  const { bookingPrice } = usePriceContext();
  const [button, setButton] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  //Creo estado para el formulario de los datos
  const [formData, setFormData] = useState({ name: "", email: "" });

  //Funcion para leer el valor de los input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButton(true);

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
      billing_details: {
        name: formData.name,
        email: formData.email,
      },
    });

    if (error) {
      console.error("[Error on createPaymentMethod]", error.message);
    } else {
      console.log("[PaymentMethod created]", paymentMethod);
      const { id } = paymentMethod;
      const totalPrice = bookingPrice.reduce((ac, index) => ac + index, 0);
      try {
        const response = await SendPaymentData(id, totalPrice);
        if (response) {
          Swal.fire({
            title: response.message,
            icon: "success",
          });
          elements.getElement(CardElement)?.clear();
          setFormData({ name: "", email: "" });
          router.push("/");
        }
      } catch (error: any) {
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
        });
        setButton(false);
      }
    }
  };

  useEffect(() => {
    console.log(startDateContext, endDateContext);
  }, [startDateContext]);

  return (
    <div className="w-full flex h-[80dvh] p-3 items-start justify-center gap-9">
      <div className="text-md px-6 py-4  flex flex-col bg-[#D0F6E9] justify-center h-fit rounded-lg items-start self-start shadow-lg">
        <h2 className="text-xl font-bold  mb-3">Booking details</h2>
        <h3 className="font-semibold">Hotel</h3>
        <h3 className="mb-5">{decodeURIComponent(params)}</h3>
        <h3 className="mb-5">
          <span className="font-semibold">Start date:</span>{" "}
          {startDateContext?.toLocaleDateString()}{" "}
          <span className="font-semibold"> - End date:</span>{" "}
          {endDateContext?.toLocaleDateString()}
        </h3>
        <h3 className="mb-3 flex flex-col">
          <span className="font-semibold ">Total rooms </span>
          {bookingRooms.reduce((acc, price) => acc + price, 0)} rooms
        </h3>
        <h3 className="font-semibold">Duration of your estance</h3>
        <span className="mb-4">
          {differenceInDays(endDateContext!, startDateContext!)} nights
        </span>
        <h3>
          <span className="font-semibold">N° Travelers:</span> {people}
        </h3>
        <h3 className="mt-8 pb-3 text-lg font-bold self-end mb-4 border border-b-[#009375]">
          Total
        </h3>
        <h3 className="font-bold text-xl self-end">
          {bookingPrice.reduce((ac, index) => ac + index, 0)} COP
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[40%] border  flex flex-col py-3 px-4 rounded-lg shadow-xl"
      >
        <h2 className="font-bold text-xl mb-5">Insert your data</h2>
        <div className="flex flex-col mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            className="p-2 bg-transparent border focus:outline-none text-gray-500  rounded-md"
            value={formData.name}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="p-2 bg-transparent border focus:outline-none text-gray-500  rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="card">Card information</label>

          <CardElement className="p-3 border" id="card" />
        </div>

        <button className="bg-[#009375] text-lg rounded-md font-semibold w-full text-center py-2 hover:bg-[#007059] text-white">
          {!button ? (
            "Confirm Payment"
          ) : (
            <div className="mx-auto loader w-5 h-5 border-2 border-t-white border-b-white rounded-full animate-spin"></div>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentView;
