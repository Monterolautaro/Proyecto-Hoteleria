"use client";

import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";

const HotelBasicInfoForm = () => {
  const { hotelInfo, setHotelInfo } = useHotelCreation();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={hotelInfo.name}
            onChange={(e) => setHotelInfo({ ...hotelInfo, name: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Hotel Name"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={hotelInfo.country}
              onChange={(e) => setHotelInfo({ ...hotelInfo, country: e.target.value })}
              className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
              placeholder="Country"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={hotelInfo.city}
              onChange={(e) => setHotelInfo({ ...hotelInfo, city: e.target.value })}
              className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
              placeholder="City"
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={hotelInfo.address}
            onChange={(e) => setHotelInfo({ ...hotelInfo, address: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Address"
          />
        </div>
      </form>
    </div>
  );
};

export default HotelBasicInfoForm;
