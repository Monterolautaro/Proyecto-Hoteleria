interface HotelCardProps {
  id: string; // ID del hotel
  image: string;
  title: string;
  location: string;
  rating?: number;
  stars?: number;
  price: number; // Aseguramos que el precio sea un número
  label?: string; // Para el "NEW" o etiquetas
}

const HotelCard: React.FC<HotelCardProps> = ({
  image,
  title,
  location,
  rating,
  stars,
  price,
  label,
}) => {
  const numericPrice = parseFloat(price.toString()); // Nos aseguramos de que el precio sea un número

  return (
    <div className="max-w-[400px] w-full bg-[#D0F6E9] rounded-lg shadow-md overflow-hidden border border-gray-200 h-[400px] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow">
      <img className="w-full h-[260px] object-cover" src={image} alt={title} />
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h2>
          {rating === 0 || stars === 0 ? (
            <span className="bg-orange-200 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
              {label || "NEW"}
            </span>
          ) : (
            <span className="bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {rating}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex items-center mb-3 h-6">
          {stars && stars > 0 ? (
            <span className="text-yellow-500 text-xl">
              {"★".repeat(stars)}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">Sin estrellas</span>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center p-4">
        <span className="text-gray-900 font-bold text-lg">
          {isNaN(numericPrice) || numericPrice <= 0
            ? "Price not available"
            : `EUR ${numericPrice.toFixed(2)}`}
        </span>
      </div>
    </div>
  );
};

export default HotelCard;
