/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const TotalPrice: React.FC<{
  hotelName: string;
  hotelId: string;
  currency: string;
}> = ({ hotelName, hotelId, currency }) => {
  const { bookingPrice, setHotelId, setCurrency } = usePriceContext();
  const { bookingRooms } = useRoomsContext();
  const [total, setTotal] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);

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
    <div className="flex self-end items-center gap-3">
      <p>
        Total price for {totalRooms} rooms:{" "}
        <span className="font-bold">
          {total} {currency}
        </span>
      </p>
      {total !== 0 ? (
        <Link
          href={`/payment/${hotelName}`}
          className="bg-[#009375] min-w-fit py-2 px-4 text-white font-medium text-xl rounded-md self-end"
        >
          Reserve now <span className="font-extrabold">{">"}</span>
        </Link>
      ) : (
        <div className="bg-[#79a39b] min-w-fit py-2 px-4 text-white font-medium text-xl rounded-md self-end cursor-default">
          Select rooms
        </div>
      )}
    </div>
  );
};

export default TotalPrice;
