"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HotelCardResults from "../HotelCardResults/HotelCardResults";
import { Hotel } from "@/interfaces/hotel";
import getHotelsResults from "@/helpers/gethotelsresults";



interface SearchResultsProps {
  hotels?: Hotel[]; 
}

const SearchResults: React.FC<SearchResultsProps> = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || ""; 
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const hotelResults = await getHotelsResults(query);
        setHotels(hotelResults);
      } finally {
        setLoading(false);
      }
    };
  
    if (query) {
      fetchHotels();
    }
  }, [query]);



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

