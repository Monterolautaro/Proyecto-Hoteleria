"use client";

import HotelCard from "@/components/cards/HotelCard";
import getHotels from "@/helpers/hotels";
import { Hotel } from "@/interfaces/hotel";
import { useEffect, useState } from "react";

const HotelsView = () => {
  const [page, setPage] = useState(1);
  const [hotels, setHotelsData] = useState<Hotel[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const hotelsData = await getHotels(page, 8);
      setHotelsData(hotelsData);
    };
    getData();
  }, [page]);

  const handleClick = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-[75%] max-w-[75%] flex-wrap gap-3 flex justify-center items-center mx-auto pt-4">
      {hotels?.length &&
        hotels.map((hotel, key) => {
          return (
            <div className="w-[280px]" key={key}>
              <HotelCard
                id={hotel.hotel_id}
                image={hotel.details.imgUrl}
                name={hotel.name}
                location={hotel.address.country}
                price={parseInt(hotel.room[0].room_type.price)}
                stars={hotel.details.stars}
              />
            </div>
          );
        })}
      <div className="w-full flex m-auto items-center justify-center gap-4 my-3">
        <button
          className="px-2 rounded-lg bg-[#009375] text-white font-semibold text-lg"
          onClick={() => handleClick(1)}
        >
          1
        </button>
        <button
          className="px-2 rounded-lg bg-[#009375] text-white font-semibold text-lg"
          onClick={() => handleClick(2)}
        >
          2
        </button>
      </div>
    </div>
  );
};

export default HotelsView;
