'use client'
import Filters from "@/components/filters/filters";
import SearchResults from "@/components/searchBar/SearchResults";
import { useState } from "react";
import { Hotel } from "@/interfaces/hotel";

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]); 

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
        <Filters onFiltersApplied={(results) => setHotels(results)} />
      </div>

      <div className="col-span-3">
        <SearchResults hotels={hotels} />
      </div>
    </div>
  )
}

export default HotelsPage;

