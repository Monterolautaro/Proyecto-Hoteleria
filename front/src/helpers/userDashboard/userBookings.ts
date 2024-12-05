import { Hotel } from "@/interfaces/hotel";

export interface IUserBookings {
  booked_rooms: {
    booked_rooms_id?: string;
    single_room_id?: string;
    double_room_id?: string;
    triple_room_id?: string;
    suite_room_id?: string;
    number_of_rooms?: number;
  };
  booking_id: string;
  start_date: string;
  end_date: string;
  hotel: Hotel;
  payments_details?: string;
  isDeleted: boolean;
}
