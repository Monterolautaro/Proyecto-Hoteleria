"use client";

import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";

const HotelDetailsForm = () => {
  const { hotelDetails, setHotelDetails } = useHotelCreation();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hotel Details</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="stars" className="block text-sm font-medium mb-1">
            Stars
          </label>
          <input
            type="number"
            id="stars"
            value={hotelDetails.stars}
            onChange={(e) => setHotelDetails({ ...hotelDetails, stars: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Stars (1-5)"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            value={hotelDetails.rating}
            onChange={(e) => setHotelDetails({ ...hotelDetails, rating: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Rating (1-5)"
          />
        </div>
        <div>
          <label htmlFor="img" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="img"
            value={hotelDetails.img}
            onChange={(e) => setHotelDetails({ ...hotelDetails, img: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Image URL"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={hotelDetails.description}
            onChange={(e) => setHotelDetails({ ...hotelDetails, description: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Hotel description"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default HotelDetailsForm;
