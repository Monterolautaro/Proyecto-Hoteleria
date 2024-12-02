'use client';

import getHotels from '@/helpers/hotels';
import { Hotel } from '@/interfaces/hotel';
import { useEffect, useState } from 'react';

const HotelsList = () => {
  const [page, setPage] = useState(1);
  const [hotels, setHotels] = useState<Hotel[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const hotelsData = await getHotels(page, 12); 
      setHotels(hotelsData);
    };
    fetchData();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setPage(page + 1); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-[85%] max-w-[85%] mx-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-center">Hotel Name</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Location</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Rooms Left</th>
            </tr>
          </thead>
          <tbody>
            {hotels && hotels.length > 0 ? (
              hotels.map((hotel) => (
                <tr key={hotel.hotel_id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-center">{hotel.name}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {hotel.address.country}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {hotel.room.length > 0
                      ? `${parseInt(hotel.availability?.totalRoomsLeft.toString()!)}`
                      : 'Not available'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="border border-gray-200 px-4 py-2 text-center">
                  No hotels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="w-full flex items-center justify-center gap-4 my-4">
          <button
            onClick={handlePrev}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#009375] hover:bg-[#007c5f]'
            }`}
            disabled={page === 1}
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg text-white font-semibold bg-[#009375] hover:bg-[#007c5f]"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelsList;
