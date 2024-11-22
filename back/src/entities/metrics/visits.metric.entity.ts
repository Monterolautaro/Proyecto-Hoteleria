import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Metrics } from './metrics.entity';
import { v4 as uuid } from 'uuid';
import { User } from '../users/user.entity';

@Entity({
  name: 'visits_metrics',
})
export class VisitsMetrics {
  @PrimaryGeneratedColumn('uuid')
  visit_metrics_id: string = uuid();

  @Column('float')
  total_visits: number;

  @Column('timestamp')
  average_duration: string;

  @ManyToOne(() => Metrics, (metrics) => metrics.visits_metrics)
  @JoinColumn({ name: 'metrics_id' })
  metrics: Metrics;

  @ManyToOne(() => User, (usuario) => usuario.visit_metrics)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
