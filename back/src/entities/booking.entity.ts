import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Hotel } from './hotel/hotel.entity';
import { BookingMetrics } from './metrics/booking.metric.entity';

@Entity({
  name: 'booking',
})
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string = uuid();

  @Column('uuid')
  room_id: string;

  @Column('date')
  checkIn: Date;

  @Column('date')
  checkOut: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.booking)
  @JoinColumn({ name: 'hotel_id' })
  hotel!: Hotel;

  @OneToOne(() => BookingMetrics, (bookingMetrics) => bookingMetrics.booking)
  booking_metrics!: BookingMetrics;
}
