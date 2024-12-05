"use client";
import getResult from "@/helpers/searchBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [result, setResult] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleChange = async (e: string) => {
    setInputValue(e);
    if (e.length >= 1) {
      setLoading(true);
      const result = await getResult(e);
      setResult(result);
      setVisible(true);
      setLoading(false);
    } else {
      setResult([]);
      setVisible(false);
    }
  };

  const handleSelectResult = (selected: string) => {
    setInputValue(selected);
    setVisible(false);

    const queryString = new URLSearchParams({ search: selected }).toString();
    router.push(`/search-results?${queryString}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const SearchBarResults = ({
    results,
    onSelectResult,
    visible,
  }: {
    results: string[];
    onSelectResult: (result: string) => void;
    visible: boolean;
  }) => {
    if (!visible) return null;
    return (
      <div
        className={`w-full max-w-3xl bg-teal-50 text-teal-700 rounded-2xl shadow-md mt-2 overflow-auto border border-teal-200 max-h-[205px]`}
      >
        {results.length >= 1 ? (
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
    <div className="flex flex-col items-center justify-center w-full animate-fadeIn py-8">
      <h2 className="text-white text-2xl font-semibold mb-4">
        Looking for a place to travel?
      </h2>
      <div
        className="flex flex-col w-full max-w-3xl relative"
        ref={searchBarRef}
      >
        <div className="flex items-center bg-transparent border border-white rounded-full px-4 py-2">
          <input
            className="flex-grow bg-transparent text-white placeholder-white outline-none px-2"
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Link
            href={{
              pathname: "/search-results",
              query: { search: inputValue },
            }}
            onClick={() => handleSelectResult(inputValue)}
            className="bg-teal-600 text-white font-semibold px-6 py-2 rounded-full border border-white hover:bg-teal-500"
          >
            Explore
          </Link>
        </div>
        <div className="absolute top-full left-0 right-0">
          <SearchBarResults
            results={loading ? ["Loading..."] : result}
            onSelectResult={handleSelectResult}
            visible={visible}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
