"use client";
import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FilterProps {
  onFiltersApplied: (hotels: any[]) => void;
}

const Filters: React.FC<FilterProps> = ({ onFiltersApplied }) => {
  const [filters, setFilters] = useState({
    countries: [] as string[],
    cities: [] as string[],
    priceRange: [] as string[],
    amenities: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key as keyof typeof filters] as string[];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return { ...prev, [key]: updatedValues };
    });
  };

  const fetchHotels = async () => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();

      if (filters.countries.length > 0) {
        queryParams.append("country", filters.countries.join(","));
      }
      if (filters.cities.length > 0) {
        queryParams.append("city", filters.cities.join(","));
      }
      if (filters.priceRange.length > 0) {
        const priceRange = filters.priceRange.map((range) =>
          range.split(" - ").map((p) => p.replace(" USD", ""))
        );
        queryParams.append("price", priceRange.join("|"));
      }

      if (filters.amenities.length > 0) {
        queryParams.append("amenities", filters.amenities.join(","));
      }

      const response = await axios.get(
        `${API_URL}/filter/hotel?${queryParams.toString()}`
      );
      console.log("esto recibe", response.data);

      if (response.data.length === 0) response.data.push("empty");

      onFiltersApplied(response.data);
    } catch (error) {
      console.log("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6  bg-[#d0f6e9]">
      <h2 className="text-xl font-bold text-gray-800">Filters</h2>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Country</h3>
        <div className="space-y-2">
          {["Colombia", "Argentina"].map((country) => (
            <label key={country} className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={() => handleFilterChange("countries", country)}
                className="form-checkbox text-teal-600 focus:ring-teal-500"
              />
              <span className="text-gray-700">{country}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">City</h3>
        <div className="space-y-2">
          {["Bogota", "Medellin", "Cartagena", "Puerto Madryn", "Neuquén"].map(
            (city) => (
              <label key={city} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("cities", city)}
                  className="form-checkbox text-teal-600 focus:ring-teal-500"
                />
                <span className="text-gray-700">{city}</span>
              </label>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Price</h3>
        <div className="space-y-2 text-sm">
          {[
            "0 USD - 49 USD",
            "50 USD - 69 USD",
            "70 USD - 119 USD",
            "120 USD - 300 USD",
          ].map((range) => (
            <label key={range} className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={() => handleFilterChange("priceRange", range)}
                checked={filters.priceRange.includes(range)}
                className="form-checkbox text-teal-600 focus:ring-teal-500"
              />
              <span className="text-gray-700">{range}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Amenities</h3>
        <div className="space-y-2">
          {["Pool", "Restaurant", "Bar", "SPA"].map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={() => handleFilterChange("amenities", amenity)}
                className="form-checkbox text-teal-600 focus:ring-teal-500"
              />
              <span className="text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={fetchHotels}
        disabled={loading}
        className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-500 transition"
      >
        {loading ? "Loading..." : "Apply Filters"}
      </button>
    </div>
  );
};

export default Filters;
