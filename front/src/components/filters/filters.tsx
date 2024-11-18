/* eslint-disable @next/next/no-img-element */
import React from "react";
import HotelCardResults from "./HotelCardResults";

const Filters = () => (
  <div className="col-span-3 p-4 bg-[#F3FFFC]">
    <h2 className="text-lg font-bold mb-4">Filters</h2>

    <div className="mb-4 p-3 border border-gray-300 rounded-md">
      <h3 className="text-md font-semibold mb-2">Price</h3>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> 0 COP - 150000 COP
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> 150000 COP - 400000 COP
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> 400000 COP - 800000 COP
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> +800000 COP
      </label>

      <hr></hr>
      <h3 className="text-md font-semibold mb-2">Country</h3>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> Colombia
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> Argentina
      </label>

      <hr></hr>

      <h3 className="text-md font-semibold mb-2">City</h3>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> Bogota
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> Medellin
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> Cartagena de Indias
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> San Andres
      </label>
      <button className="text-teal-600 text-sm mt-2">Show more</button>

      <hr></hr>

      <h3 className="text-md font-semibold mb-2">Amenities</h3>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> Pool
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> Restaurant
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> Bar
      </label>
      <label className="block mb-2">
        <input type="checkbox" className="mr-2" /> SPA
      </label>
      <button className="text-teal-600 text-sm mt-2">Show more</button>
    </div>
  </div>
);

const ResultsList = () => (
  <div className="col-span-9">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Results List</h2>
      <div className="flex gap-2">
        <select className="p-2 border border-gray-300 rounded-md">
          <option>Sort by Name</option>
          <option>Sort by Price</option>
        </select>
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
          <span className="text-sm font-medium mr-2">
            400000 COP - 800000 COP
          </span>
          <span className="text-sm font-medium mr-2">Colombia</span>
          <span className="text-sm font-medium">Bogota</span>
        </div>
      </div>
    </div>
    <HotelCardResults />
    <HotelCardResults />
    <HotelCardResults />
    <HotelCardResults />
    <button className="mt-4 w-full px-4 py-2 bg-teal-500 text-white rounded-lg">
      See more results
    </button>
  </div>
);

const Page = () => (
  <div className="grid grid-cols-12 gap-2 p-6 mx-40 my-6 bg-gray-50">
    <Filters />
    <ResultsList />
  </div>
);

export default Page;
