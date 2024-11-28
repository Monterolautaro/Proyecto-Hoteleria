import { IBookingRooms } from "./roomsContext";

export interface IStripeData {
  id: string;
  userId: string;
  hotelId: string;
  rooms: IBookingRooms[];
  checkIn: Date;
  checkOut: Date;
  travelers: number;
  amount: number;
}
