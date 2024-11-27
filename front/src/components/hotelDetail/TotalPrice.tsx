/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const TotalPrice: React.FC<{ hotelName: string; hotelId: string }> = ({
  hotelName,
  hotelId,
}) => {
  const { bookingPrice, setHotelId } = usePriceContext();
  const { bookingRooms } = useRoomsContext();
  const [total, setTotal] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);

  console.log('este es el booking price', bookingPrice);

  useEffect(() => {
    const totalRooms = bookingRooms
      .map((room) => room.rooms)
      .reduce((acc, room) => acc + room, 0);
    setTotalRooms(totalRooms);

    const total = bookingPrice.reduce((acc, price) => acc + price, 0); //Calcula el total de habitaciones
    console.log(total);
    setTotal(total);

    setHotelId(hotelId);
  }, [hotelId]);

  return (
    <div className="flex self-end items-center gap-3">
      <p>
        Total price for {totalRooms} rooms:{" "}
        <span className="font-bold">{total} COP</span>
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
