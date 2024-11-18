/* eslint-disable @next/next/no-img-element */
"use client"; // Asegúrate de que este componente sea cliente
import { useRouter } from "next/navigation";
import React from "react";

interface HotelCardProps {
  id: string; // ID del hotel para navegar a la vista de detalles
  image: string;
  title: string;
  location: string;
  rating?: number; // Puede ser opcional
  price: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  image,
  title,
  location,
  rating,
  price,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/hotel-detail/${id}`); // Redirige a la vista de detalles
  };

  return (
    <div
      className="max-w-[400px] w-full bg-[#D0F6E9] rounded-lg shadow-md overflow-hidden border border-gray-200 h-[400px] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <img className="w-full h-[260px] object-cover" src={image} alt={title} />
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h2>
          {rating !== undefined ? (
            <span className="bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {rating}
            </span>
          ) : (
            <span className="bg-orange-200 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex items-center mb-3 h-6">
          {rating !== undefined && (
            <span className="text-yellow-500 text-xl">
              {"★".repeat(Math.floor(rating))}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center p-4">
        <span className="text-gray-900 font-bold text-lg">{price}</span>
      </div>
    </div>
  );
};

export default HotelCard;
