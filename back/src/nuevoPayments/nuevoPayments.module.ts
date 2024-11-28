import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeService } from './nuevoPayments.service';
import { StripeController } from './nuevoPayments.controller';
import { Payment } from '../entities/payments.entity';
import { PaymentRepository } from './nuevoPayments.repository';
import { BookingRepository } from './booking.repository';
import { Booking } from 'src/entities/booking.entity';
import { User } from 'src/entities/users/user.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { BookedRooms } from 'src/entities/hotel/rooms/booked.rooms.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Booking, User, Hotel, BookedRooms]),
  ],
  controllers: [StripeController],
  providers: [StripeService, PaymentRepository, BookingRepository],
})
export class StripeModule {}
