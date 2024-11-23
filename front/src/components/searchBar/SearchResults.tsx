"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import HotelCardResults from "../filters/HotelCardResults";
import { Hotel } from "@/interfaces/hotel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SearchResultsProps {
  hotels?: Hotel[]; 
}

const SearchResults: React.FC<SearchResultsProps> = ({ hotels: parentHotels }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || ""; 
  const [hotels, setHotels] = useState<Hotel[]>(parentHotels || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!parentHotels && query) {
      const fetchHotels = async () => {
        setLoading(true);
        try {
          const response = await axios.post(`${API_URL}/search/bar-result?query=${query}`);
          setHotels(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchHotels();
    }
  }, [query, parentHotels]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {hotels && hotels.length > 0 ? (
            hotels.map((hotel) => <HotelCardResults key={hotel.hotel_id} hotel={hotel} />)
          ) : (
            <p className="text-gray-600">No results found{query && ` for "${query}"`}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
