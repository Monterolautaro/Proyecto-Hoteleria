// utils/fetchCards.ts

import { config } from "dotenv";
config({ path: ".env" });

const API_URL = process.env.NEXT_PUBLIC_API_URL;;

export const fetchCards = async (): Promise<any[]> => {
    try {
      const response = await fetch(`${API_URL}/hotels`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Devuelve un array vacío si ocurre un error
    }
  };
  

