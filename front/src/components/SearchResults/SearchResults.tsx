"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import HotelCardResults from "@/components/HotelCardResults/HotelCardResults";
import { Hotel } from "@/interfaces/hotel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SearchResultsProps {
  hotelsData?: Hotel[] | ["empty"];
}

const SearchResults: React.FC<SearchResultsProps> = ({ hotelsData }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const [hotels, setHotels] = useState<Hotel[] | ["empty"] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query && hotelsData?.length! === 0) {
      console.log("no entra a los filtros");

      const fetchHotels = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            `${API_URL}/search/bar-result?query=${query}`
          );

          setHotels(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchHotels();
    } else if (hotelsData?.length! > 1 && hotelsData) {
      console.log("hotelsdata", hotelsData);
      setHotels(hotelsData);
    } else if (hotelsData && hotelsData[0] === "empty") {
      setHotels(["empty"]);
    }
  }, [query, hotelsData]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {hotels && Array.isArray(hotels) && hotels.length > 0 ? (
            hotels.map((hotel, key) =>
              typeof hotel === "object" ? (
                <HotelCardResults key={key} hotel={hotel} />
              ) : null
            )
          ) : hotels && hotels[0] === "empty" ? (
            <p className="text-gray-600">No results found for this filter</p>
          ) : (
            <p className="text-gray-600">
              No results found{query && ` for "${query}"`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
