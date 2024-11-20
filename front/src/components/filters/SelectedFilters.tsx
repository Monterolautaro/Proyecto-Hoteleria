import React from "react";
import { Filters as FiltersInterface } from "@/interfaces/hotel";

interface SelectedFiltersProps {
  filters: FiltersInterface;
  onRemoveFilter: (category: keyof FiltersInterface, value: string) => void;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({ filters, onRemoveFilter }) => {
    return (
        <div className="flex flex-wrap mb-4">
       {Object.entries(filters).map(([category, values]) =>
            (values as string[]).map((value) => (
              <div
                key={`${category}-${value}`}
                className="flex items-center  text-teal-700 px-3 py-1 rounded-md border border-teal-300 mx-0.5"
              >
                <span>{value}</span>
                <button
                  className="ml-2 text-teal-500 hover:text-teal-700"
                  onClick={() => onRemoveFilter(category as keyof FiltersInterface, value)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      );
};

export default SelectedFilters;
