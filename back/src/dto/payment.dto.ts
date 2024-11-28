import { IsDate, IsNotEmpty } from 'class-validator';
import { IBookingRooms } from 'src/Interfaces/booking-rooms.interface';

export class PaymentDto {
  @IsNotEmpty()
  id: string; // payment_method_id

  @IsNotEmpty()
  userId: string; // user_id

  @IsNotEmpty()
  hotelId: string; // hotel_id

  @IsNotEmpty()
  rooms: IBookingRooms[];

  @IsNotEmpty()
  @IsDate()
  checkIn: Date;

  @IsNotEmpty()
  @IsDate()
  checkOut: Date;

  @IsNotEmpty()
  travelers: number;

  @IsNotEmpty()
  amount: number;
}
