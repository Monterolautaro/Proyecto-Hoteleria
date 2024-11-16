'use client'
import getResult from '@/helpers/searchBar'
import React, { useState } from 'react'
import SearchBarResults from './searchBarResults'

const SearchBar = () => {
  const [result, setResult] = useState<string[]>([""]);

  const handleChange = async (e: string) => {
    if (e.length >= 3) {
      const result = await getResult(e);
      console.log(result);
      setResult(result);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <h2 className="text-white text-2xl font-semibold mb-4">
        Looking for a place to travel?
      </h2>
      <div className="flex items-center w-full max-w-3xl bg-transparent border border-white rounded-full px-4 py-2">
        <input
          className="flex-grow bg-transparent text-white placeholder-white outline-none px-2"
          type="text"
          placeholder="Search..."
          onChange={(e) => handleChange(e.target.value)}
        />
        <button className="bg-teal-600 text-white font-semibold px-6 py-2 rounded-full border border-white hover:bg-teal-500">
          Explore
        </button>
      </div>
      <SearchBarResults results={result} />
    </div>
  );
};

export default SearchBar;
