"use client";
import Filters from "@/components/filters/filters";
import SearchResults from "@/components/SearchResults/SearchResults";
import { useState, Suspense, useEffect } from "react";
import { Hotel } from "@/interfaces/hotel";

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  return (
    <div className="grid grid-cols-4 gap-6 p-6 w-[80%] mx-auto">
      <div className="col-span-1 bg-[#d0f6e9] h-fit p-4 rounded-lg shadow-md">
        <Filters onFiltersApplied={(results) => setHotels(results)} />
      </div>

      <div className="col-span-3">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults hotelsData={hotels} />
        </Suspense>
      </div>
    </div>
  );
};

export default HotelsPage;
