import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Payment } from '../payments.entity';
import { Booking } from '../booking.entity';

@Entity()
export class PaymentDetails {
  @PrimaryGeneratedColumn('uuid')
  payment_details_id: string = uuid();

  @OneToOne(() => Payment, (payment) => payment.payment_details)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @OneToOne(() => Booking, (booking) => booking.payments_details)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;
}
