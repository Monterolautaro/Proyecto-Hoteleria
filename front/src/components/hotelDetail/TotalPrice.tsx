"use client";

import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import Link from "next/link";

const TotalPrice = () => {
  const { bookingPrice } = usePriceContext();
  const total = bookingPrice.reduce((acc, price) => acc + price, 0);
  return (
    <div className="flex self-end items-center gap-3">
      <p>
        Total price: <span className="font-bold">{total}</span>
      </p>
      <Link
        href="/payment"
        className="bg-[#009375] min-w-fit py-2 px-4 text-white font-medium text-xl rounded-md self-end"
      >
        Reserve now <span className="font-extrabold">{">"}</span>
      </Link>
    </div>
  );
};

export default TotalPrice;
