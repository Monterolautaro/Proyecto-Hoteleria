export interface Hotel {
  hotel_id: string;
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
  availability?: {
    available: boolean;
    totalRoomsLeft: number;
}
};

  export interface Filters {
    price: string[];
    country: string[];
    city: string[];
    amenities: string[];
  }
  