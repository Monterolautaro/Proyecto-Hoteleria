/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

const HotelCardResults = () => {
  const router = useRouter();

  const handleClick = () => {
    const id = "12e399cc-d608-42d3-85ce-6120bef3d07d";
    router.push(`/hotel-detail/${id}`);
  };
  return (
    <div className="flex p-4 bg-white shadow-md rounded-lg border border-gray-300 mb-4">
      <img
        src="https://via.placeholder.com/150"
        alt="Hotel"
        className="w-24 h-24 rounded-md object-cover"
      />
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-bold">Hotel Marriot Bogota</h3>
        <p className="text-sm text-gray-500">Bogota, Colombia</p>
        <p className="text-sm text-teal-600 mt-2">
          4.8 ★ Excellent (999 reviews)
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-teal-600">400000 COP</p>
        <button
          onClick={handleClick}
          className="mt-2 px-4 py-2 bg-[#009375] text-white rounded-lg"
        >
          See all prices
        </button>
      </div>
    </div>
  );
};

export default HotelCardResults;
