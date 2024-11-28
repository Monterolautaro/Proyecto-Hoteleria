"use client";

import { useDateContext } from "@/helpers/hotelDetail/dateContext";

const PeopleSelector = () => {
  const { setPeople } = useDateContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeople(parseInt(e.target.value, 10));
  };
  return (
    <div className="w-[60%]">
      <select
        onChange={(e) => handleChange(e)}
        className="w-full h-full rounded-r-xl text-center bg-[#f3fffc] font-semibold focus:outline-none"
      >
        <option className="rounded" value="1">
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
};

export default PeopleSelector;
