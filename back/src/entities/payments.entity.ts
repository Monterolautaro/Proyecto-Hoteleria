/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users/user.entity';
import { PaymentDetails } from './payments/paymentdetails.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  method: string;

  @Column()
  status: string;

  @Column()
  stripePaymentIntentId: string;

  @OneToOne(() => User, (user) => user.payment)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => PaymentDetails, (paymentDetails) => paymentDetails.details)
  @JoinColumn({ name: 'payment_details_id' })
  payment_details: PaymentDetails;
}
