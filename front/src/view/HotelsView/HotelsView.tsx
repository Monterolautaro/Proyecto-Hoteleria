"use client";

import HotelCard from "@/components/cards/HotelCard";
import getHotels from "@/helpers/hotels";
import { Hotel } from "@/interfaces/hotel";
import { useEffect, useState } from "react";

const HotelsView = () => {
  const pagesButton = [1, 2, 3, 4];
  const [page, setPage] = useState(1);
  const [hotels, setHotelsData] = useState<Hotel[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const hotelsData = await getHotels(page, 20);
      setHotelsData(hotelsData);
    };
    getData();
  }, [page]);

  const handleClick = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 250, behavior: "smooth" });
  };
  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="mt-8 text-3xl font-bold pb-4 ml-[11.5%]">
        Here you can find all hotels{" "}
      </h2>
      <div className="w-[85%] max-w-[85%] flex-wrap gap-3 flex justify-center items-center mx-auto pt-4">
        {hotels ? (
          hotels?.length &&
          hotels.map((hotel, key) => {
            return (
              <div className="w-[250px]" key={key}>
                <HotelCard
                  id={hotel.hotel_id}
                  image={hotel.details.imgUrl}
                  name={hotel.name}
                  location={hotel.address.country}
                  price={parseInt(hotel.room[0].room_type.price)}
                  stars={hotel.details.stars}
                  rating={hotel.details.rating}
                  currency={hotel.room[0].room_type.currency}
                />
              </div>
            );
          })
        ) : (
          <div className="w-full h-[50vh] animate-fadeIn"></div>
        )}
        <div className="w-full flex m-auto items-center justify-center gap-4 my-3">
          {pagesButton.map((pageNumber, key) => {
            return (
              <button
                key={key}
                className="px-2 rounded-lg bg-[#009375] my-4 w-7 text-white font-semibold text-lg"
                style={
                  page == pageNumber
                    ? { backgroundColor: "#009375" }
                    : { backgroundColor: "#00352a" }
                }
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotelsView;
