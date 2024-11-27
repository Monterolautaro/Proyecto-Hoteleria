export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  username: string;
  phone: string;
  role: string;
  bookings: number;
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
  birthdate: Date;
}

export interface IUserCredentials {
  email: string;
  username: string;
  password?: string;
}
