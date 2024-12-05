import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';
import { IBookingRooms } from 'src/Interfaces/booking-rooms.interface';

export class PaymentDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Payment method ID',
    example: 'an UUID value like 00000000-0000-0000-0000-000000000000',
  })
  id: string; // payment_method_id

  @IsNotEmpty()
  @ApiProperty({
    description: 'The user ID that made the payment',
    example: 'an UUID value like 00000000-0000-0000-0000-000000000000',
  })
  userId: string; // user_id

  @IsNotEmpty()
  @ApiProperty({
    description: 'The hotel ID where the payment was made',
    example: 'an UUID value like 00000000-0000-0000-0000-000000000000',
  })
  hotelId: string; // hotel_id

  @IsNotEmpty()
  @ApiProperty({
    description: 'The list of rooms reserved',
    example: 'an array of objects like [{room_id: "00000000-0000-0000-0000-000000000000", quantity: 1}, {room_id: "00000000-0000-0000-0000-000000000000", quantity: 2}]',
  })
  rooms: IBookingRooms[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'The check-in date',
    example: '0000-00-00',
  })
  @IsDate()
  checkIn: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The check-out date',
    example: '0000-00-00',
  })
  @IsDate()
  checkOut: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The number of travelers',
    example: '4'
  })
  travelers: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The amount of the payment',
    example: '400'
  })
  amount: number;
}
