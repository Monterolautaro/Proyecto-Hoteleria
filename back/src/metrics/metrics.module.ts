import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metrics } from '../entities/metrics/metrics.entity';
import { MetricsRepository } from './metrics.repository';
import { BookingMetrics } from 'src/entities/metrics/booking.metric.entity';
import { MetricTypes } from 'src/entities/metrics/metrics.types.entity';
import { SearchMetrics } from 'src/entities/metrics/search.metric.entity';
import { TimeMetrics } from 'src/entities/metrics/time.metrics.entity';
import { VisitsMetrics } from 'src/entities/metrics/visits.metric.entity';
import { User } from 'src/entities/users/user.entity';



@Module({
    imports: [TypeOrmModule.forFeature([Metrics,BookingMetrics, MetricTypes, SearchMetrics, TimeMetrics, VisitsMetrics, User])],
    controllers: [MetricsController],
    providers: [MetricsService, MetricsRepository]
})
export class MetricsModule {}