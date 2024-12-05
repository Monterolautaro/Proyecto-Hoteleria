"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import HotelCardResults from "@/components/HotelCardResults/HotelCardResults";
import { Hotel } from "@/interfaces/hotel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SearchResultsProps {
  hotelsData?: Hotel[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ hotelsData }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const [hotels, setHotels] = useState<Hotel[] | string[]>([""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query && hotelsData?.length! === 0) {
      console.log("aquí renderiza cuando no hay .length");

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
    } else if (hotelsData?.length! > 0 && hotelsData) {
      setHotels(hotelsData);
    }
  }, [query, hotelsData]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {hotels.length > 0 && hotels && hotels[0] !== "empty" ? (
            hotels.map((hotel, key) => (
              <HotelCardResults key={key} hotel={hotel as Hotel} />
            ))
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
