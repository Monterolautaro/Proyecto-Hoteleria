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

export interface IGoogleUser {
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
}

export interface ILogoutProps {
  setUserSession: (params: IUserSession | null) => void;
  setUserGoogleSession?: (params: IGoogleUser | null) => void;
}

export interface IUserCookies {
  email: string;
  id: string;
  role: string[];
  verified: boolean;
}

export interface IUserGoogleCookies {
  email: string;
  image: string;
  name: string;
}

export interface IUserGoogleData {
  user_id: string;
  name: string;
  lastname: string;
  birthday: string;
  total_visits: 0;
  average_session_duration: 0;
  role: string[];
  isSuspend: boolean;
  verified: boolean;
  credential: {
    credential_id: string;
    username: string;
    email: string;
    password: string;
  };
}
