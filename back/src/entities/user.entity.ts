import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Credentials } from './credentials.entity';
import { Booking } from './booking.entity';
import { VisitsMetrics } from './metrics/visits.metric.entity';
import { TimeMetrics } from './metrics/time.metrics.entity';
import { Payment } from './payments.entity';
import { Roles } from 'roles.enum';

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

  @Column()
  birthday: Date;

  @Column('float', { default: 0 })
  total_visits: number;

  @Column('float', { default: 0 })
  average_session_duration: number;

  @Column('simple-array')
  role: Roles[]

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

  @OneToOne(() => Payment, (payment) => payment.user)
  payment!: Payment;
}
