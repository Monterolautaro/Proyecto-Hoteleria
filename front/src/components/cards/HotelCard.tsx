import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
interface HotelCardProps {
  id: string; // ID del hotel
  image: string;
  name: string;
  location: string;
  rating?: number;
  stars?: number;
  price: number; // Aseguramos que el precio sea un número
  label?: string;
  currency?: string; // Para el "NEW" o etiquetas
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  image,
  name,
  location,
  rating,
  stars,
  price,
  label,
  currency,
}) => {
  const numericPrice = parseFloat(price.toString()); // Nos aseguramos de que el precio sea un número

  return (
    <Link
      href={`/hotel-detail/${id}`}
      className=" w-full bg-[#D0F6E9] rounded-lg shadow-xl border border-gray-200 h-[380px] flex flex-col p-3 justify-between cursor-pointer hover:shadow-2xl transition-shadow group"
    >
      <div
        className="w-full min-h-[240px] max-h-[240px] transition-all ease-in-out bg-cover group-hover:scale-105 duration-300 rounded-lg"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="pt-2 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </h2>
          {rating === 0 || stars === 0 ? (
            <span className="bg-orange-200 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
              {label || "NEW"}
            </span>
          ) : (
            <span className="bg-[#009375] text-white text-xs font-bold px-2 py-1 rounded-full">
              {rating}
            </span>
          )}
        </div>
        <p className="text-[#009375] text-sm mb-2">{location}</p>
        <div className="flex items-center h-6">
          {stars && stars > 0 ? (
            <span className="text-yellow-500 text-xl">{"★".repeat(stars)}</span>
          ) : (
            <span className="text-gray-400 text-sm">Sin estrellas</span>
          )}
        </div>
        <div className="flex justify-end items-center">
          <span className="text-gray-900 font-bold text-lg">
            {isNaN(numericPrice) || numericPrice <= 0
              ? "Price not available"
              : `${numericPrice} ${currency}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
