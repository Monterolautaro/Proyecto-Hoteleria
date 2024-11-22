'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Filters as FiltersInterface, Hotel } from "@/interfaces/hotel";
import SelectedFilters from "./SelectedFilters";
import HotelCardResults from "./HotelCardResults";
import FiltersPanel from "./FiltersPanel";

const Filters = () => {
  const [filters, setFilters] = useState<FiltersInterface>({
    price: [],
    country: [],
    city: [],
    amenities: [],
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);

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

  return (
    <div className="grid grid-cols-12 gap-6 p-4 bg-[#F3FFFC] mx-40 my-6">
      <div className="col-span-3">
        <FiltersPanel onFilterChange={handleFilterChange} />
      </div>
      <div className="col-span-9">
        <SelectedFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-lg font-bold">Results List</h2>
          {hotels.map((hotel) => (
            <HotelCardResults key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
