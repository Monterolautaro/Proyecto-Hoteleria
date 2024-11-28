import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Metrics } from './metrics.entity';
import { Booking } from '../booking.entity';

@Entity({
  name: 'booking_metrics',
})
export class BookingMetrics {
  @PrimaryGeneratedColumn('uuid')
  booking_metrics_id: string = uuid();

  @Column('float')
  total_bookings: number;

  @Column('float')
  cancelled_bookings: number;

  @Column('float')
  completed_bookings: number;

  @ManyToOne(() => Metrics, (metrics) => metrics.booking_metrics)
  @JoinColumn({ name: 'metrics_id' })
  metrics: Metrics;
}
