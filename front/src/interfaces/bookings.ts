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

export interface UsersBookings {
  booking_id: number;
  start_date: string;
  end_date: string;
  hotel_name: string; 
  payments_details: {
    payment_status: string;
    payment_method: string;
  };
  booked_rooms: {
    room_number: string;
    room_type: string;
  };
}
