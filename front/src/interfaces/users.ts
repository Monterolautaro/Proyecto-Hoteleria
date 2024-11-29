export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  username: string;
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
