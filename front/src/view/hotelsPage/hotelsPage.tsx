"use client";
import Filters from "@/components/filters/filters";
import SearchResults from "@/components/searchBar/SearchResults";
import { useEffect, useState } from "react";
import { Hotel } from "@/interfaces/hotel";

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    // console.log(hotels);
  }, [hotels]);

  return (
    <div className="grid grid-cols-4 gap-6 p-6 max-w-[85%] m-auto">
      <div className="col-span-1 bg-[#d0f6e9] p-4 rounded-lg shadow-md">
        <Filters
          onFiltersApplied={(results) => {
            setHotels(results);
          }}
        />
      </div>

      <div className="col-span-3">
        <SearchResults hotelsData={hotels} />
      </div>
    </div>
  );
};

export default HotelsPage;
