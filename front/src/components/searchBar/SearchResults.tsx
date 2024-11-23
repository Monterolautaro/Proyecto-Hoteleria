"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import HotelCardResults from "../filters/HotelCardResults";
import { Hotel } from "@/interfaces/hotel";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = 'force-dynamic';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || ""; // Obtener la query desde la URL
  const [hotels, setHotels] = useState<Hotel[]>([]); 

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Hacer la solicitud al backend
        const response = await axios.post(`${API_URL}/search/bar-result?query=${query}`);

        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchHotels();
    }
  }, [query]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 gap-4">
        {hotels.length > 0 ? (
          hotels.map((hotel) => <HotelCardResults key={hotel.hotel_id} hotel={hotel} />)
        ) : (
          <p className="text-gray-600">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
