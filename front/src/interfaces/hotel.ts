export interface Hotel {
  hotel_id: number;
  name: string;
  address: {
    city: string;
    country: string;
    street: string;
  };
  details: {
    stars: number;
    rating: number;
    imgUrl: string;
    description: string;
  };
  room: {
    type: string;
    room_type: {
      price: string;
      currency: string;
      description: string;
    };
  }[];
}

  export interface Filters {
    price: string[];
    country: string[];
    city: string[];
    amenities: string[];
  }
  