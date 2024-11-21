'use client'
import HotelCardResults from "./HotelCardResults";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Filters as FiltersInterface, Hotel } from "@/interfaces/hotel";
import SelectedFilters from "./SelectedFilters";

const Filters = () => {
  const initialFilters: FiltersInterface = {
    price: [],
    country: [],
    city: [],
    amenities: [],
  };

  const [filters, setFilters] = useState<FiltersInterface>(initialFilters);
  const [hotels, setHotels] = useState<Hotel[]>([]);
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
  };

  const handleRemoveFilter = (category: keyof FiltersInterface, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const query = new URLSearchParams({
          price: filters.price.join(","),
          country: filters.country.join(","),
          city: filters.city.join(","),
          amenities: filters.amenities.join(","),
        });

        const response = await axios.post(`http://localhost:3000/filter?${query.toString()}`);
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching filtered hotels:", error);
      }
    };

    fetchFilteredData();
  }, [filters]);

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
    <div className="grid grid-cols-12 gap-6 p-4 bg-[#F3FFFC] mx-40 my-6">
      <div className="col-span-3 p-4 bg-[#F3FFFC]">
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

      <div className="col-span-9">
        <SelectedFilters filters={filters} onRemoveFilter={handleRemoveFilter} />

        <div className="col-span-9 grid grid-cols-1 gap-4">
          <h2 className="text-lg font-bold ">Results List</h2>
          {hotels.map((hotel) => (
            <HotelCardResults key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;