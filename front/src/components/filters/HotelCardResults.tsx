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
    router.push(`/hotel-detail/${hotel.id}`);
  };

  return (
    <div className="flex p-4 bg-gray-50 shadow-md rounded-lg border border-gray-300 mb-4">
      <img
        src={hotel.imageUrl}
        alt={hotel.title}
        className="w-24 h-24 rounded-md object-cover"
      />
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-bold">{hotel.title}</h3>
        <p className="text-sm text-gray-500">{hotel.location}</p>
        <p className="text-sm text-teal-600 mt-2">
          {hotel.rating} ★ Excellent
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-teal-600">{hotel.price} USD</p>
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