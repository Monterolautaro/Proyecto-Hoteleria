"use client";

import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import Link from "next/link";

const TotalPrice: React.FC<{ hotelName: string }> = ({ hotelName }) => {
  const { bookingPrice } = usePriceContext();
  const { bookingRooms } = useRoomsContext();
  const total = bookingPrice.reduce((acc, price) => acc + price, 0);
  const totalRooms = bookingRooms.reduce((acc, price) => acc + price, 0);

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
