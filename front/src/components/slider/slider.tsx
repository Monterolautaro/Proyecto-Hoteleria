"use client";
import HotelCard from "@/components/cards/HotelCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ComponentSlider(): JSX.Element {
  const [hotels, setHotels] = useState<any[]>([]); 
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const componentsPerPage = 4;

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotels", {
        params: { page: 1, limit: 8 },
      });

      const data = response.data;
      console.log("Data fetched:", data);

      const topRatedHotels = data.filter((hotel: any) => hotel.details?.stars === 5).slice(0, 6);

      if (topRatedHotels.length === 0) {
        setHotels([]);
        return;
      }

      setHotels(topRatedHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const nextSlide = (): void => {
    const totalSlides = Math.ceil(hotels.length / componentsPerPage);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, hotels]);

  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const getVisibleComponents = () => {
    const startIndex = currentIndex * componentsPerPage;
    return hotels.slice(startIndex, startIndex + componentsPerPage);
  };

  return (
    <div className="relative max-w-6xl mx-auto mt-4">
      <h2 className="text-2xl font-bold ml-4 mb-4">Weekly Recommendations</h2>
      {hotels.length > 0 ? (
        <div
          className="relative group flex justify-center h-fit pb-6"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {getVisibleComponents().map((hotel, index) => {
            // Acceso correcto al precio del primer tipo de habitación
            const price = hotel.room?.[0]?.room_type?.price || 0;

            return (
              <div key={index} className="w-1/4 px-2">
                <HotelCard
                  id={hotel.hotel_id}
                  image={hotel.details?.imgUrl || "https://via.placeholder.com/600x400"}
                  title={hotel.name}
                  location={`${hotel.address?.city}, ${hotel.address?.country}`}
                  stars={hotel.details?.stars || 0}
                  rating={hotel.details?.rating || 0}
                  price={price}
                  label={""}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500">No hotels available with 5 stars</div>
      )}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(hotels.length / componentsPerPage) }).map(
          (_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-[#009375]" : "bg-[#b0b0b0]"}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          )
        )}
      </div>
    </div>
  );
}
