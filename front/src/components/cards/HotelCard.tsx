// components/HotelCard.tsx
import { useRouter } from 'next/navigation'; // Importa useRouter de next/navigation
import React from 'react';

interface HotelCardProps {
  id: string; // Agrega un ID para la navegación
  image: string;
  title: string;
  location: string;
  rating?: number;
  price: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ id, image, title, location, rating, price }) => {
  const router = useRouter(); // Instancia de router

  const handleCardClick = () => {
    router.push(`/detailHotels/${id}`); // Navega a la página específica del hotel
  };

  return (
    <div
      onClick={handleCardClick} // Añade el evento de clic
      className="max-w-sm bg-[#D0F6E9] rounded-lg shadow-md overflow-hidden border border-gray-200 h-96 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{title}</h2>
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
              {'★'.repeat(Math.floor(rating))}
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
