export interface User {
  user_id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  bookings: number;
  birthday?: string;
}

export interface Hotel {
  id: string;
  name: string;
  availability: string;
  rooms: number;
  location: string;
}
export interface IUserData {
  name: string;
  lastname: string;
  birthdate: string;
}

export interface IUserCredentials {
  email: string;
  username: string;
  password?: string;
}
