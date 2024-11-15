"use client";
import HotelCard from "@/components/cards/HotelCard"; // Importa el componente HotelCard
import { useEffect, useState } from "react";

// Array de componentes con variaciones
const components = [
  <HotelCard
    key={1}
    image="https://via.placeholder.com/600x400?text=Hotel+1"
    title="Hotel Paradise"
    location="Cartagena, Colombia"
    rating={5}
    price="COP 150,000"
  />,
  <HotelCard
    key={2}
    image="https://via.placeholder.com/600x400?text=Hotel+2"
    title="Hotel Ocean Breeze"
    location="Santa Marta, Colombia"
    price="COP 120,000"
  />,
  <HotelCard
    key={3}
    image="https://via.placeholder.com/600x400?text=Hotel+3"
    title="Mountain Retreat"
    location="San Gil, Colombia"
    rating={4}
    price="COP 100,000"
  />,
  <HotelCard
    key={4}
    image="https://via.placeholder.com/600x400?text=Hotel+4"
    title="Sunset Resort"
    location="San Andrés, Colombia"
    rating={3}
    price="COP 80,000"
  />,
  <HotelCard
    key={5}
    image="https://via.placeholder.com/600x400?text=Hotel+5"
    title="Luxury Getaway"
    location="Medellín, Colombia"
    rating={5}
    price="COP 200,000"
  />,
  <HotelCard
    key={6}
    image="https://via.placeholder.com/600x400?text=Hotel+6"
    title="Beachfront Hotel"
    location="Barranquilla, Colombia"
    rating={5}
    price="COP 180,000"
  />,
  <HotelCard
    key={7}
    image="https://via.placeholder.com/600x400?text=Hotel+7"
    title="Cozy Stay"
    location="Cali, Colombia"
    rating={4}
    price="COP 110,000"
  />,
];

export default function ComponentSlider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Número de componentes visibles en el carrusel
  const componentsToShow = 4;

  // Función para mostrar el componente siguiente
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  // useEffect hook para cambiar los componentes automáticamente
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  // Manejar evento de mouse over
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Manejar evento de mouse leave
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  // Calcular el índice de inicio para los componentes visibles
  const getVisibleComponents = () => {
    const startIndex = currentIndex;
    const visibleComponents = components.slice(
      startIndex,
      startIndex + componentsToShow
    );

    if (visibleComponents.length < componentsToShow) {
      // Si el número de componentes visibles es menor que los solicitados, agregar desde el principio
      const remainingComponents = components.slice(
        0,
        componentsToShow - visibleComponents.length
      );
      return visibleComponents.concat(remainingComponents);
    }

    return visibleComponents;
  };

  return (
    <div className="relative w-full mx-auto mt-4">
      {/* Título */}
      <h2 className="text-2xl font-bold ml-4 mb-4">Weekly Recommendations</h2>

      {/* Contenedor del carrusel */}
      <div
        className="relative group flex justify-center space-x-4 px-[50px]"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={{ height: "70vh" }}
      >
        {/* Mostrar los componentes activos */}
        {getVisibleComponents().map((component, index) => (
          <div key={index} className="w-1/5 px-2">
            {" "}
            {/* Reducción de tamaño de los componentes */}
            {component}
          </div>
        ))}
      </div>

      {/* Indicadores de navegación como puntitos */}
      <div className="flex justify-center mt-4 space-x-2">
        {components.map((_, index) => (
          <div
            key={index}
            className={`mb-9 h-3 w-3 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${
              index === currentIndex ? "bg-[#009375]" : "bg-[#b0b0b0]" // Usamos un gris más oscuro (#b0b0b0) para los puntos inactivos
            }`}
            onClick={() => setCurrentIndex(index)} // Hacer clic en los puntos de navegación
          ></div>
        ))}
      </div>
    </div>
  );
}
