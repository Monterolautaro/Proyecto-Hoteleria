/* eslint-disable @next/next/no-img-element */
// components/TravelGrid.tsx

import Link from "next/link";
import React from "react";

interface TravelCardProps {
  image: string;
  location: string;
}

const TravelCard: React.FC<TravelCardProps> = ({ image, location }) => {
  return (
    <Link href={`/search-results?search=${encodeURIComponent(location)}`}>

      <div className="relative overflow-hidden rounded-lg shadow-lg h-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <img
          src={image}
          alt={location}
          className="max-w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-end p-3">
          <h3 className="text-white font-bold text-lg">{location}</h3>
        </div>

      </div>
    </Link>
  );
};

const TravelGrid: React.FC = () => {
  const travelDestinations = [
    {
      image: "/assets/cartagena.jpg",
      location: "Cartagena",
    },
    {
      image: "/assets/Medellin.jpg",
      location: "Medellin",
    },
    {
      image: "/assets/salta.jpg",
      location: "Salta",
    },
    {
      image: "/assets/San-andres.webp",
      location: "San Andres",
    },
    {
      image: "/assets/bquilla.jpg",
      location: "Barranquilla",
    },
    {
      image: "/assets/Bogota.jpg",
      location: "Bogota",
    },
    {
      image: "/assets/neuquen.jpg",
      location: "Neuquén",
    },
    {
      image: "/assets/puertomadryn.webp",
      location: "Puerto Madryn",
    },
    {
      image: "/assets/ushuaia.webp",
      location: "Ushuaia",
    },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto mt-6 mb-6">
      {" "}
      {/* Ajusta los márgenes y el ancho máximo */}
      <h2 className="text-2xl font-bold mb-4">Best places to travel</h2>
      {/* Configuración de la cuadrícula */}
      <div className="grid grid-cols-4 grid-rows-3 gap-4">
        {/* Elemento grande (Cartagena) */}
        <div className="col-span-2 row-span-2">
          <TravelCard
            image={travelDestinations[0].image}
            location={travelDestinations[0].location}
          />
        </div>

        {/* Elementos pequeños */}
        {travelDestinations.slice(1).map((destination, index) => (
          <div key={index} className="col-span-1 row-span-1">
            <TravelCard
              image={destination.image}
              location={destination.location}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelGrid;
