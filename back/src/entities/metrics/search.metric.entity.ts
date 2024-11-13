import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Metrics } from './metrics.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'search_metrics',
})
export class SearchMetrics {
  @PrimaryGeneratedColumn('uuid')
  search_metrics_id: string = uuid();

  @Column('float')
  total_searches: number;

  @Column('float')
  searches_per_user: number;

  @ManyToOne(() => Metrics, (metrics) => metrics.search_metrics)
  @JoinColumn({ name: 'metrics_id' })
  metrics: Metrics;
}
