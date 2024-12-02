/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDateContext } from "@/helpers/hotelDetail/dateContext";
import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import { SendPaymentData } from "@/helpers/payment/SendPaymentData";
import validateForm from "@/helpers/payment/validateForm";
import { IStripeData } from "@/interfaces/paymentData";
import { IPaymentData } from "@/interfaces/paymentDataForm";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const PaymentView: React.FC<{ params: string }> = ({ params }) => {
  const { startDateContext, endDateContext, people, setDiffDays } =
    useDateContext(); //Fechas y numero de personas
  const { bookingRooms, resetRooms } = useRoomsContext(); //Numero de habitaciones
  const { bookingPrice, resetPrice, hotelId, currency } = usePriceContext(); //Precio total
  const [button, setButton] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const user = JSON.parse(Cookies.get("user") || "{}");

  //Creo estado para el formulario de los datos
  const [formData, setFormData] = useState<IPaymentData>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<IPaymentData>({ name: "", email: "" });

  //Funcion para leer el valor de los input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData.name!, formData.email!);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

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
      Swal.fire({
        title: error.message,
        icon: "warning",
      });
      setButton(false);
    } else {
      const { id } = paymentMethod;
      const totalPrice = bookingPrice.reduce((ac, index) => ac + index, 0);
      try {
        const data: IStripeData = {
          id,
          userId: user.id,
          amount: totalPrice,
          hotelId: hotelId!,
          rooms: bookingRooms,
          checkIn: startDateContext!,
          checkOut: endDateContext!,
          travelers: people!,
        };

        const response = await SendPaymentData(data);
        console.log(response);

        if (response.message) {
          Swal.fire({
            title: response.message,
            icon: "success",
          });
          elements.getElement(CardElement)?.clear();
          setFormData({ name: "", email: "" });
          setDiffDays(0);
          resetPrice([]);
          resetRooms([]);
          router.push("/dashboard");
        } else {
          Swal.fire({
            title: "We cannot process your payment, try again later",
            icon: "warning",
          });
          setButton(false);
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

  return (
    <div className="w-[85%] mx-auto flex flex-col items-center animate-fadeIn">
      <h2 className="mt-6 mb-3 font-bold text-2xl pb-5 border-b border-b-black w-[75%]">
        Plese check the information and fill the form
      </h2>
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
            {bookingRooms
              .filter((room) => room.rooms > 0)
              .map((room, key) => {
                return (
                  <div key={key} className="flex flex-col">
                    <p>
                      {room.rooms} {room.type}
                    </p>
                  </div>
                );
              })}
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
            {bookingPrice.reduce((ac, index) => ac + index, 0)} {currency}
          </h3>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-[40%] border  flex flex-col py-3 px-4 rounded-lg shadow-xl"
        >
          <h2 className="font-bold text-xl mb-5">Insert your data</h2>
          {/* Campo Name */}
          <div className="flex flex-col mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              className={`p-2 bg-transparent border rounded-md focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.name}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name}</span>
            )}
          </div>

          {/* Campo Email */}
          <div className="flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className={`p-2 bg-transparent border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
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
    </div>
  );
};

export default PaymentView;
