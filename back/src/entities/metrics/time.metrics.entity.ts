import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Metrics } from './metrics.entity';
import { User } from '../users/user.entity';

@Entity({
  name: 'time_metrics',
})
export class TimeMetrics {
  @PrimaryGeneratedColumn('uuid')
  time_metrics_id: string = uuid();

  /*@Column('timestamp')
  session_starts: Date;

  @Column('timestamp')
  session_ends: Date;*/

  @Column('time')
  session_duration: string;

  @Column('timestamp')
  session_start_time: number;

  @Column('timestamp')
  session_end_time: number;

  @ManyToOne(() => Metrics, (metrics) => metrics.time_metrics)
  @JoinColumn({ name: 'metrics_id' })
  metrics: Metrics;

  @ManyToOne(() => User, (usuario) => usuario.time_metrics)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
