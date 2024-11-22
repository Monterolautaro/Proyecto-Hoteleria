import React, { useState } from "react";
import { Filters as FiltersInterface } from "@/interfaces/hotel";

interface FiltersPanelProps {
  onFilterChange: (category: keyof FiltersInterface, value: string) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ onFilterChange }) => {
  const initialFilters: FiltersInterface = {
    price: [],
    country: [],
    city: [],
    amenities: [],
  };

  const [filters, setFilters] = useState<FiltersInterface>(initialFilters);
  const [showAllCities, setShowAllCities] = useState(false);

  const handleFilterChange = (category: keyof FiltersInterface, value: string) => {
    setFilters((prev) => {
      const isSelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });

    onFilterChange(category, value);
  };

  const cities = [
    "Bogota",
    "Neuquen",
    "Medellín",
    "Salta",
    "Cartagena de Indias",
    "Puerto Madryn",
    "San Andres",
    "Santa Rosa",
    "General Pico",
    "Victorica",
    "Toay",
    "Eduardo Castex",
    "Cipolletti",
    "General Roca",
    "San Carlos de Bariloche",
    "Trelew",
    "Puerto Pirámides",
    "Esquel",
    "El Calafate",
    "El Chaltén",
    "Río Gallegos",
    "Ushuaia",
    "San Salvador de Jujuy",
    "Purmamarca",
    "Tilcara",
    "Purmamarca",
    "Formosa",
    "Resistencia",
    "Santiago del Estero",
  ];

  const displayedCities = showAllCities ? cities : cities.slice(0, 7);

  return (
    <div className="p-4 bg-[#F3FFFC]">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      <div className="mb-4 p-3 border border-gray-400 rounded-md">
        <h3 className="text-md font-semibold mb-2">Price</h3>
        {["0 COP - 150000 COP", "150000 COP - 400000 COP", "400000 COP - 800000 COP", "+800000 COP"].map((price) => (
          <label key={price} className="block mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.price.includes(price)}
              onChange={() => handleFilterChange("price", price)}
            />
            {price}
          </label>
        ))}

        <hr className="border-gray-400"></hr>
        <h3 className="text-md font-semibold mb-2">Country</h3>
        {["Colombia", "Argentina"].map((country) => (
          <label key={country} className="block mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.country.includes(country)}
              onChange={() => handleFilterChange("country", country)}
            />
            {country}
          </label>
        ))}

        <hr className="border-gray-400"></hr>

        <h3 className="text-md font-semibold mb-2">City</h3>
        {displayedCities.map((city) => (
          <label key={city} className="block mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.city.includes(city)}
              onChange={() => handleFilterChange("city", city)}
            />
            {city}
          </label>
        ))}
        <button
          className="text-blue-500 underline mt-2"
          onClick={() => setShowAllCities((prev) => !prev)}
        >
          {showAllCities ? "Show Less" : "Show More"}
        </button>

        <hr className="border-gray-400"></hr>

        <h3 className="text-md font-semibold mb-2">Amenities</h3>
        {["Pool", "Restaurant", "Bar", "SPA"].map((amenity) => (
          <label key={amenity} className="block mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.amenities.includes(amenity)}
              onChange={() => handleFilterChange("amenities", amenity)}
            />
            {amenity}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FiltersPanel;
