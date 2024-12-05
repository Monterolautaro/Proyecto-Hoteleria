export interface UserBookings {
    hotel: string;
    startDate: string;
    endDate: string;
    nights: number;
    rooms: RoomsTest[];
    travelers: number;
    status: boolean;
  }
  
  interface RoomsTest {
    type: string;
    rooms: number;
  }

  export interface IUser {
    user_id: string | undefined;
    name: string;
    lastname: string;
    phone?: string;
    credential: {
      credential_id: string;
      email: string | undefined;
      password?: string;
      username: string | undefined;
    };
    role: string;
    bookings: IBooking[];
    birthday?: string;
    total_visits?: number;
    average_session_duration?: number;
    isSuspend?: boolean;
    profile_photo: string;
  }
  
  export interface IBooking {
    booking_id: string;
    start_date: string;
    end_date: string;
    hotel: {
      hotel_id: string;
      name: string;
      amenities?: {
        pool: boolean;
        gym: boolean;
        spa: boolean;
        restaurant: boolean;
        bar: boolean;
      };
      details?: {
        stars: number;
        rating: number;
        imgUrl?: string;
        description?: string;
      };
      address?: {
        city: string;
        country: string;
        street?: string;
      };
      availability?: {
        available: boolean;
        totalRoomsLeft: number;
      };
    };
    booked_rooms: {
      booked_rooms_id: string;
      single_room_id?: string;
      double_room_id?: string;
      triple_room_id?: string;
      suite_room_id?: string;
      number_of_rooms: number;
    };
    payments_details?: string;
  }
  
