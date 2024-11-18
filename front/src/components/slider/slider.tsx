"use client";
import HotelCard from "@/components/cards/HotelCard"; // Importa el componente HotelCard
import { useEffect, useState } from "react";

const components = [
  <HotelCard
    key={1}
    id="1"
    image="https://via.placeholder.com/600x400?text=Hotel+1"
    title="Hotel Paradise"
    location="Cartagena, Colombia"
    rating={5}
    price="COP 150,000"
  />,
  <HotelCard
    key={2}
    id="2"
    image="https://via.placeholder.com/600x400?text=Hotel+2"
    title="Hotel Ocean Breeze"
    location="Santa Marta, Colombia"
    price="COP 120,000"
  />,
  <HotelCard
    key={3}
    id="3"
    image="https://via.placeholder.com/600x400?text=Hotel+3"
    title="Mountain Retreat"
    location="San Gil, Colombia"
    rating={4}
    price="COP 100,000"
  />,
  <HotelCard
    key={4}
    id="4"
    image="https://via.placeholder.com/600x400?text=Hotel+4"
    title="Sunset Resort"
    location="San Andrés, Colombia"
    rating={3}
    price="COP 80,000"
  />,
  <HotelCard
    key={5}
    id="5"
    image="https://via.placeholder.com/600x400?text=Hotel+5"
    title="Luxury Getaway"
    location="Medellín, Colombia"
    rating={5}
    price="COP 200,000"
  />,
  <HotelCard
    key={6}
    id="6"
    image="https://via.placeholder.com/600x400?text=Hotel+6"
    title="Beachfront Hotel"
    location="Barranquilla, Colombia"
    rating={5}
    price="COP 180,000"
  />,
  <HotelCard
    key={7}
    id="7"
    image="https://via.placeholder.com/600x400?text=Hotel+7"
    title="Cozy Stay"
    location="Cali, Colombia"
    rating={4}
    price="COP 110,000"
  />,
  <HotelCard
    key={8}
    id="8"
    image="https://via.placeholder.com/600x400?text=Hotel+8"
    title="Elegant Lodge"
    location="Bogotá, Colombia"
    rating={5}
    price="COP 300,000"
  />,
];

export default function ComponentSlider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const componentsPerPage = 4;

  const nextSlide = (): void => {
    const totalSlides = Math.ceil(components.length / componentsPerPage);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const getVisibleComponents = () => {
    const startIndex = currentIndex * componentsPerPage;
    return components.slice(startIndex, startIndex + componentsPerPage);
  };

  return (
    <div className="relative max-w-6xl mx-auto mt-4">
      <h2 className="text-2xl font-bold ml-4 mb-4">Weekly Recommendations</h2>
      <div
        className="relative group flex justify-center h-fit pb-6"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {getVisibleComponents().map((component, index) => (
          <div key={index} className="w-1/4 px-2">
            {component}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(components.length / componentsPerPage) }).map(
          (_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-[#009375]" : "bg-[#b0b0b0]"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          )
        )}
      </div>
    </div>
  );
}
