// components/TravelGrid.tsx
import React from 'react';

interface TravelCardProps {
  image: string;
  location: string;
}

const TravelCard: React.FC<TravelCardProps> = ({ image, location }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg h-full">
      <img src={image} alt={location} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-25 flex items-end p-3">
        <h3 className="text-white font-bold text-lg">{location}</h3>
      </div>
    </div>
  );
};

const TravelGrid: React.FC = () => {
  const travelDestinations = [
    { image: 'https://via.placeholder.com/600x400?text=Cartagena', location: 'Cartagena' },
    { image: 'https://via.placeholder.com/600x400?text=Medellin', location: 'Medellin' },
    { image: 'https://via.placeholder.com/600x400?text=Mendoza', location: 'Mendoza' },
    { image: 'https://via.placeholder.com/600x400?text=San+Andres', location: 'San Andres' },
    { image: 'https://via.placeholder.com/600x400?text=Barranquilla', location: 'Barranquilla' },
    { image: 'https://via.placeholder.com/600x400?text=Bogota', location: 'Bogota' },
    { image: 'https://via.placeholder.com/600x400?text=Buenos+Aires', location: 'Buenos Aires' },
    { image: 'https://via.placeholder.com/600x400?text=Barranquilla', location: 'Barranquilla' },
    { image: 'https://via.placeholder.com/600x400?text=Bogota', location: 'Bogota' },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto mt-6 mb-6"> {/* Ajusta los márgenes y el ancho máximo */}
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
