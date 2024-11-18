"use client";
import getResult from "@/helpers/searchBar";
import Link from "next/link";
import { useState } from "react";

const SearchBar = () => {
  const [result, setResult] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = async (e: string) => {
    setInputValue(e);
<<<<<<< Updated upstream
    if (e.length > 2) {
=======
    if (e.length >= 1) {
>>>>>>> Stashed changes
      setLoading(true);
      const result = await getResult(e);
      setResult(result);
      setVisible(true); // Muestra los resultados
      setLoading(false);
    } else {
      setResult([]);
      setVisible(false); // Oculta los resultados si aun no hay 3 caracteres
    }
  };

  const handleSelectResult = (selected: string) => {
    setInputValue(selected); // Cambia el valor del input por la opción seleccionada
    setVisible(false); // Oculta la lista de resultados
  };

  const SearchBarResults = ({
    results,
    onSelectResult,
    visible,
  }: {
    results: string[];
    onSelectResult: (result: string) => void;
    visible: boolean;
  }) => {
    if (!visible) return null; // No renderiza nada si no es visible

    return (
      <div
        className={`w-full max-w-3xl bg-teal-50 text-teal-700 rounded-2xl shadow-md mt-2 overflow-auto border border-teal-200 max-h-[205px]`}
      >
<<<<<<< Updated upstream
        {results.length > 0 ? (
=======
        {results.length >= 1 ? (
>>>>>>> Stashed changes
          results.map((result, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-teal-100 cursor-pointer border-b border-teal-200 last:border-b-0"
              onClick={() => onSelectResult(result)}
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
          <Link
            href="/search-results"
            className="bg-teal-600 text-white font-semibold px-6 py-2 rounded-full border border-white hover:bg-teal-500"
          >
            Explore
          </Link>
        </div>
        {/* Renderiza los resultados o el mensaje de "No results found" */}
<<<<<<< Updated upstream
        <div className="absolute top-full left-0 right-0">
          <SearchBarResults
            results={loading ? ["Loading..."] : result}
            onSelectResult={handleSelectResult}
            visible={visible}
          />
        </div>
=======
        {inputValue.length >= 1 && (
          <div className="absolute top-full left-0 right-0">
            <SearchBarResults results={loading ? ["Loading..."] : result} />
          </div>
        )}
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default SearchBar;
