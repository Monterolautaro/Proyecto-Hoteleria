/* eslint-disable @next/next/no-img-element */
"use client";
import { Hotel } from "@/interfaces/hotel";
import { useRouter } from "next/navigation";

interface HotelCardResultsProps {
  hotel: Hotel;
}

const HotelCardResults: React.FC<HotelCardResultsProps> = ({ hotel }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/hotel-detail/${hotel.hotel_id}`);
  };

  return (
    <div className="flex p-4 bg-gray-50 shadow-md rounded-lg border border-gray-300 mb-4">
      <img
        src={hotel.details.imgUrl}
        alt={hotel.name}
        className="w-24 h-24 rounded-md object-cover"
      />
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-bold">{hotel.name}</h3>
        <p className="text-sm text-gray-500">
          {hotel.address.city}, {hotel.address.country}
        </p>
        <p className="text-sm text-teal-600 mt-2">{hotel.details.rating} ★</p>
        <p className="text-sm text-gray-700">{hotel.details.description}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-teal-600">
          From {hotel.room[0].room_type.price} {hotel.room[0].room_type.currency}
        </p>
        <button
          onClick={handleClick}
          className="mt-2 px-4 py-2 bg-[#009375] text-white rounded-lg"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default HotelCardResults;
