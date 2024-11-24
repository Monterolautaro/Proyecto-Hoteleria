"use client";
import Filters from "@/components/filters/filters";
import SearchResults from "@/components/SearchResults/SearchResults";
import { useState } from "react";
import { Hotel } from "@/interfaces/hotel";

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    // console.log(hotels);
  }, [hotels]);

  return (
    <div className="grid grid-cols-4 gap-6 p-6 w-[80%] mx-auto">
      <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
        <Filters onFiltersApplied={(results) => setHotels(results)} />
      </div>

      <div className="col-span-3">
        <SearchResults hotelsData={hotels} />
      </div>
    </div>
  );
};

export default HotelsPage;
