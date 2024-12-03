import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Metrics } from './metrics.entity';

@Entity({
  name: 'metric_types',
})
export class MetricTypes {
  @PrimaryGeneratedColumn('uuid')
  metric_type_id: string = uuid();

  @Column()
  metric_name: string;

  @OneToMany(() => Metrics, (metrics) => metrics.metric_type)
  @JoinColumn({ name: 'metrics_id' })
  metrics: Metrics;
}
