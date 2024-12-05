/* eslint-disable @next/next/no-img-element */
"use client";
import { Hotel } from "@/interfaces/hotel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface HotelCardResultsProps {
  hotel: Hotel;
}

const HotelCardResults: React.FC<HotelCardResultsProps> = ({ hotel }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/hotel-detail/${hotel.hotel_id}`);
  };

  return (
    <div className="flex p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition mb-6 min-h-120px h-[170px] text-ellipsis">
      <img
        src={hotel.details?.imgUrl || "/placeholder-image.png"}
        alt={hotel.name || "Hotel"}
        className="w-32 h-full rounded-md object-cover"
      />
      <div className="ml-6 flex-grow max-h-[95%] h-full text-elipsis overflow-hidden">
        <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
        <p className="text-sm text-gray-500">
          {hotel.address.city}, {hotel.address.country}
        </p>
        <p className="text-sm text-teal-600 mt-2">{hotel.details.rating} ★</p>
        <p className="text-sm text-gray-700 mt-2 pr-2 ">
          {hotel.details.description}
        </p>
      </div>
      <div className="text-right min-w-[15%] w-[15%]">
        <p className="text-lg font-semibold text-teal-600">
          {hotel.room && hotel.room[0]?.room_type.price
            ? `${hotel.room[0].room_type.price} ${hotel.room[0].room_type.currency}`
            : "Price not available"}
        </p>
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 bg-teal-600 w-full text-white font-semibold rounded-lg hover:bg-teal-500 transition"
        >
          See all prices
        </button>
      </div>
    </div>
  );
};

export default HotelCardResults;
