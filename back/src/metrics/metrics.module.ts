import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metrics } from '../entities/metrics/metrics.entity';
import { MetricsRepository } from './metrics.repository';



@Module({
    imports: [TypeOrmModule.forFeature([Metrics])],
    controllers: [MetricsController],
    providers: [MetricsService, MetricsRepository]
})
export class MetricsModule {}