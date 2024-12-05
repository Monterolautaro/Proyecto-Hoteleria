"use client";

import getHotels from "@/helpers/hotels";
import { Hotel } from "@/interfaces/hotel";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const HotelsList = () => {
  const [page, setPage] = useState(1);
  const [hotels, setHotels] = useState<Hotel[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const hotelsData = await getHotels(page, 10);
      setHotels(hotelsData);
    };
    fetchData();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const token = Cookies.get("token");
      if (!token) return;

      await axios.delete(`${API_URL}/hotels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHotels(hotels?.filter((hotel) => hotel.hotel_id !== id) || null);
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-[85%] max-w-[85%] mx-auto">
        <div className="flex justify-between items-center mb-4"></div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-center">
                Hotel Name
              </th>
              <th className="border border-gray-200 px-4 py-2 text-center">
                Location
              </th>
              <th className="border border-gray-200 px-4 py-2 text-center">
                Rooms Left
              </th>
              <th className="border border-gray-200 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels && hotels.length > 0 ? (
              hotels.map((hotel) => (
                <tr key={hotel.hotel_id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {hotel.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {hotel.address.country}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {hotel.room.length > 0
                      ? `${parseInt(
                          hotel.availability?.totalRoomsLeft.toString()!
                        )}`
                      : "Not available"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center flex justify-center gap-2">
                    <button
                      className="px-2 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
                      onClick={() => handleDelete(hotel.hotel_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-200 px-4 py-2 text-center"
                >
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
              page === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#009375] hover:bg-[#007c5f]"
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
