export class SearchHotelDto {
  hotel_id: string;
  name: string;
  address: {
    city: string;
    country: string;
    street: string;
  };
  amenities: {
    pool: boolean;
    gym: boolean;
    spa: boolean;
    restaurant: boolean;
    bar: boolean;
  };
  availability: {
    available: boolean;
    totalRoomsLeft: number;
  };
  room: Array<{
    room_id: string;
    type: string;
    room_type: {
      room_type_id: string;
      price: number;
      currency: string;
      rooms_left: number;
      description: string;
    };
  }>;
  details: {
    stars: number;
    rating: number;
    imgUrl: string;
    description: string;
  };
}
