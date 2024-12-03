export interface IRooms {
  room_id: string;
  room_type: {
    currency: string;
    description: string;
    price: string;
    room_type_id: string;
    rooms_left: number;
  };
  type: string;
}

export interface IAmenities {
  amenities_id: string;
  pool: boolean;
  spa: boolean;
  gym: boolean;
  restaurant: boolean;
  bar: boolean;
}

export interface IHotel {
  hotel_id: string;
  name: string;
  details: {
    stars: number;
    rating?: number;
    imgUrl: string;
    description: string;
  };
  address: {
    city: string;
    country: string;
    street: string;
  };
  /* availability: {
    available: boolean;
    totalRoomsLeft: number;
}; */
  room: IRooms[];
  amenities: IAmenities;
}
export interface IUser {
  id: string;
  email: string;
  role: string[];
  verified: boolean;
}

export interface IUserSession {
  token: string;
  user: IUser;
}

export interface IUserResponse {
  accessToken: string;
  user: {
    email: string;
    name: string;
    role: string[];
  };
  message: string;
  status: string;
}
