import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Credentials } from '../credentials.entity';
import { Booking } from '../booking.entity';
import { VisitsMetrics } from '../metrics/visits.metric.entity';
import { TimeMetrics } from '../metrics/time.metrics.entity';
import { Payment } from '../payments.entity';
import { Roles } from 'roles.enum';
import { Hotel } from '../hotel/hotel.entity';
import { RegisteredHotelsDetails } from './registered-hotels-details.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string = uuid();

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({
    nullable: true,
  })
  birthday: string;

  @Column('float', { default: 0 })
  total_visits: number;

  @Column('float', { default: 0 })
  average_session_duration: number;

  @Column('simple-array')
  role: Roles[];

  @Column('boolean', { default: false })
  isSuspend: boolean;

  @Column(
    {
      default: 'https://res.cloudinary.com/dln87ugim/image/upload/v1733280421/profile_xvxiir.png',
      nullable: true
    })
  profile_photo: string;

  @OneToOne(() => Credentials, (credential) => credential.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'credential_id' })
  credential!: Credentials;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[];

  @OneToMany(() => VisitsMetrics, (visitMetrics) => visitMetrics.user)
  visit_metrics: VisitsMetrics[];

  @OneToMany(() => TimeMetrics, (timeMetrics) => timeMetrics.user)
  time_metrics: TimeMetrics[];

  @OneToMany(() => Payment, (payment) => payment.user)
  @JoinColumn({ name: 'payment_id' })
  payment!: Payment;

  @OneToMany(() => Hotel, (hotel) => hotel.owner)
  hotels?: Hotel[];

  @Column('boolean', { nullable: true, default: false })
  verified?: boolean;

  @OneToOne(() => RegisteredHotelsDetails, (details) => details.owner, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'registered_hotels_details_id' })
  registered_hotels_details?: RegisteredHotelsDetails;
}
