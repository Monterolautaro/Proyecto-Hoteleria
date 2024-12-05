/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const TotalPrice: React.FC<{
  hotelName: string;
  hotelId: string;
  currency: string;
}> = ({ hotelName, hotelId, currency }) => {
  const { bookingPrice, setHotelId, setCurrency } = usePriceContext();
  const { bookingRooms } = useRoomsContext();
  const [googleUser, setGoogleUser] = useState("");
  const [total, setTotal] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const googleUser = JSON.parse(Cookies.get("googleUser") || "{}");
    const { id } = JSON.parse(Cookies.get("user") || "{}");
    setGoogleUser(googleUser.email);
    setUserId(id);
  }, []);

  useEffect(() => {
    const totalRooms = bookingRooms
      .filter((room) => room.rooms > 0)
      .map((room) => room.rooms)
      .reduce((acc, room) => acc + room, 0); //Calcula el numero de habitaciones

    const total = bookingPrice.reduce((acc, price) => acc + price, 0); //Calcula el precio total

    setTotal(total);
    setTotalRooms(totalRooms);
    setCurrency(currency); // Identifica la moneda a utilizar

    setHotelId(hotelId);
  }, [bookingRooms]);

  return (
    <div className="flex self-end items-center gap-3 mb-10">
      <p>
        Total price for {totalRooms} rooms:{" "}
        <span className="font-bold">
          {total} {currency}
        </span>
      </p>
      {total !== 0 ? (
        userId || googleUser ? (
          <Link
            href={`/payment/${hotelName}`}
            className="bg-[#009375] min-w-fit py-2 px-4 text-white font-medium text-xl rounded-md self-end hover:bg-[#3fceb1] transition duration-150 animate-fadeIn"
          >
            Reserve now <span className="font-extrabold">{">"}</span>
          </Link>
        ) : (
          <Link
            className="text-sm text-[#009375] hover:underline select-none"
            href="/login"
          >
            You must be logged to reserve
          </Link>
        )
      ) : (
        <div className="bg-[#79a39b] min-w-fit py-2 px-4 text-white font-medium text-xl rounded-md self-end cursor-default">
          Select rooms
        </div>
      )}
    </div>
  );
};

export default TotalPrice;
