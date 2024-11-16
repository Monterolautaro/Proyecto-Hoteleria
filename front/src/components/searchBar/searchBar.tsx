'use client';
import getResult from '@/helpers/searchBar';
import { useState } from 'react';

const SearchBarResults = ({ results }: { results: string[] }) => {
  return (
    <div className="w-full max-w-3xl bg-teal-50 text-teal-700 rounded-lg shadow-md mt-2 overflow-hidden border border-teal-200">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-teal-100 cursor-pointer border-b border-teal-200 last:border-b-0"
            onClick={() => alert(`Selected: ${result}`)} // Aquí puedes manejar la acción al seleccionar
          >
            {result}
          </div>
        ))
      ) : (
        <div className="px-4 py-3 text-teal-500">No results found</div>
      )}
    </div>
  );
};

const SearchBar = () => {
  const [result, setResult] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (e: string) => {
    setInputValue(e);
    if (e.length >= 3) {
      setLoading(true);
      const result = await getResult(e);
      setResult(result);
      setLoading(false);
    } else {
      setResult([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <h2 className="text-white text-2xl font-semibold mb-4">
        Looking for a place to travel?
      </h2>
      <div className="flex flex-col w-full max-w-3xl relative">
        <div className="flex items-center bg-transparent border border-white rounded-full px-4 py-2">
          <input
            className="flex-grow bg-transparent text-white placeholder-white outline-none px-2"
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button className="bg-teal-600 text-white font-semibold px-6 py-2 rounded-full border border-white hover:bg-teal-500">
            Explore
          </button>
        </div>
        {/* Renderiza los resultados o el mensaje de "No results found" */}
        {inputValue.length >= 3 && (
          <div className="absolute top-full left-0 right-0">
            <SearchBarResults results={loading ? ['Loading...'] : result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
