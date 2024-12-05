import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './users/user.entity';
import { Hotel } from './hotel/hotel.entity';
import { BookingMetrics } from './metrics/booking.metric.entity';
import { PaymentDetails } from './payments/paymentdetails.entity';
import { BookedRooms } from './hotel/rooms/booked.rooms.entity';

@Entity({
  name: 'booking',
})
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string = uuid();

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column({default: false})
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.booking)
  @JoinColumn({ name: 'hotel_id' })
  hotel!: Hotel;

  //conexion uno a uno con paymentsdetails
  @OneToOne(() => PaymentDetails, (paymentsDetails) => paymentsDetails.booking)
  @JoinColumn({ name: 'payments_details_id' })
  payments_details!: PaymentDetails;

  @OneToOne(() => BookedRooms, (room) => room.booking)
  @JoinColumn({ name: 'booked_rooms_id' })
  booked_rooms?: BookedRooms;
}
