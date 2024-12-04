export interface User {
  user_id: string | undefined;
  name: string;
  lastname: string;
  phone: string;
  credential: {
    credential_id: string;
    email: string | undefined;
    password: string | undefined;
    username: string | undefined;
  };
  role: string;
  bookings: number;
  birthday?: string;
  total_visits?: number;
  average_session_duration?: number;
  isSuspend?: boolean; 
}

export interface Hotel {
  id: string;
  name: string;
  availability: string;
  rooms: number;
  location: string;
}
export interface IUserData {
  name: string | undefined;
  lastname: string | undefined;
  birthdate: string | undefined;
}

export interface IUserCredentials {
  userId: string | undefined;
  email: string | undefined;
  username: string | undefined;
  password?: string;
}

export interface IAdminData {
  name: string | undefined;
  lastname: string | undefined;
  birthdate: string | undefined;
  email: string | undefined;
  username: string | undefined;
}