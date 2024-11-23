'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Filters as FiltersInterface,  } from "@/interfaces/hotel";
import SelectedFilters from "./SelectedFilters";
import FiltersPanel from "./FiltersPanel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Filters = () => {
  const [filters, setFilters] = useState<FiltersInterface>({
    price: [],
    country: [],
    city: [],
    amenities: [],
  });

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
    const query = new URLSearchParams();

    if (filters.price.length) query.append('price', filters.price.join(','));
    if (filters.country.length) query.append('country', filters.country.join(','));
    if (filters.city.length) query.append('city', filters.city.join(','));
    if (filters.amenities.length) query.append('amenities', filters.amenities.join(','));

    const response = await axios.post(`${API_URL}/filter/hotels?${query.toString()}`);
    console.log(response);
  } catch (error) {
    console.error('Error fetching filtered hotels:', error);
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
      </div>
    </div>
  );
};

export default Filters;
