import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { MetricTypes } from './metrics.types.entity';
import { BookingMetrics } from './booking.metric.entity';
import { VisitsMetrics } from './visits.metric.entity';
import { TimeMetrics } from './time.metrics.entity';
import { SearchMetrics } from './search.metric.entity';

@Entity({
  name: 'metrics',
})
export class Metrics {
  @PrimaryGeneratedColumn('uuid')
  metrics_id: string = uuid();

  @ManyToOne(() => MetricTypes, (type) => type.metrics)
  @JoinColumn({ name: 'metric_type_id' })
  metric_type: MetricTypes;

  @OneToMany(() => BookingMetrics, (bookingMetrics) => bookingMetrics.metrics)
  @JoinColumn({ name: 'booking_metrics_id' })
  booking_metrics: BookingMetrics[];

  @OneToMany(() => VisitsMetrics, (visitMetrics) => visitMetrics.metrics)
  @JoinColumn({ name: 'visit_metrics_id' })
  visits_metrics: VisitsMetrics[];

  @OneToMany(() => TimeMetrics, (timeMetrics) => timeMetrics.metrics)
  @JoinColumn({ name: 'time_metrics_id' })
  time_metrics: TimeMetrics[];

  @OneToMany(() => SearchMetrics, (searchMetrics) => searchMetrics.metrics)
  @JoinColumn({ name: 'search_metrics_id' })
  search_metrics: SearchMetrics[];

  @Column('date')
  created_at: Date = new Date();
}
