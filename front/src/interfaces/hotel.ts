export interface Hotel {
    id: number;
    imageUrl: string;
    title: string;
    location: string;
    description: string;
    price: number;
    rating: number;
  }
  
  export interface Filters {
    price: string[];
    country: string[];
    city: string[];
    amenities: string[];
  }
  