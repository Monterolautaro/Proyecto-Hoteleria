// helpers/getTravelDestinations.ts

export interface TravelDestination {
    image: string;
    location: string;
  }
  
  export const getTravelDestinations = async (): Promise<TravelDestination[]> => {
    try {
      const response = await fetch('https://api.example.com/travel-destinations'); // Reemplaza esta URL con la de tu API real
      if (!response.ok) {
        throw new Error(`Error fetching destinations: ${response.statusText}`);
      }
      
      const data = await response.json();
  
      // Mapear los datos en el formato adecuado (si es necesario)
      return data.map((item: any) => ({
        image: item.image || 'https://via.placeholder.com/600x400', // URL de imagen de reserva
        location: item.location || 'Unknown Location',
      }));
    } catch (error) {
      console.error("Error fetching travel destinations:", error);
      return [];
    }
  };
  