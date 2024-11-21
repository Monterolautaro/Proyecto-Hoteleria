/* eslint-disable @next/next/no-img-element */
'use client'
import HotelCardResults from "./HotelCardResults";
import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import { Filters as FiltersInterface, Hotel } from "@/interfaces/hotel";
import SelectedFilters from "./SelectedFilters";

const mockHotels: Hotel[] = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/150',
    title: 'Hotel Marryot Bogota',
    location: 'Bogota, Colombia',
    description: 'A modern hotel in the heart of the city.',
    price: 400000,
    rating: 4.8,
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/150',
    title: 'Hotel Cartagena Dreams',
    location: 'Cartagena de Indias, Colombia',
    description: 'Enjoy luxury near the beach.',
    price: 800000,
    rating: 4.7,
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/150',
    title: 'Medellin Sunset Hotel',
    location: 'Medellin, Colombia',
    description: 'Relax with beautiful views of the mountains.',
    price: 600000,
    rating: 4.5,
  },
];

const Filters = () => {
  const initialFilters: FiltersInterface = {
    price: [],
    country: [],
    city: [],
    amenities: [],
  };

  const [filters, setFilters] = useState<FiltersInterface>(initialFilters);
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);

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
    const fetchFilteredData = () => {
      const filteredHotels = mockHotels.filter((hotel) => {

        const matchesPrice =
          !filters.price.length ||
          filters.price.some((priceRange) => {
            const [min, max] = priceRange.split(' COP - ').map((v) => parseInt(v.replace('+', ''), 10));
            return hotel.price >= (min || 0) && hotel.price <= (max || Infinity);
          });

        const matchesCountry =
          !filters.country.length ||
          filters.country.includes(hotel.location.split(', ')[1]);

        const matchesCity =
          !filters.city.length || filters.city.includes(hotel.location.split(', ')[0]);

        const matchesAmenities = true; 

        return matchesPrice && matchesCountry && matchesCity && matchesAmenities;
      });

      setHotels(filteredHotels); 
    };

    fetchFilteredData();
  }, [filters]);


  return  (
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
{["Bogota", "Medellin", "Cartagena de Indias", "San Andres"].map((city) => (
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

  )

}


export default Filters


/*  const ResultsList = () => (
  <div className="col-span-9">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Results List</h2>
      <div className="flex gap-2">
        <select className="p-2 border border-gray-300 rounded-md">
          <option>Sort by Name</option>
          <option>Sort by Price</option>
        </select>
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
          <span className="text-sm font-medium mr-2">
            400000 COP - 800000 COP
          </span>
          <span className="text-sm font-medium mr-2">Colombia</span>
          <span className="text-sm font-medium">Bogota</span>
        </div>
      </div>
    </div>
    <HotelCardResults />
    <HotelCardResults />
    <HotelCardResults />
    <HotelCardResults />
    <button className="mt-4 w-full px-4 py-2 bg-teal-500 text-white rounded-lg">
      See more results
    </button>
  </div>
);
 */
