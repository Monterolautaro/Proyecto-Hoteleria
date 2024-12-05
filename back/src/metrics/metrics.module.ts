import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metrics } from '../entities/metrics/metrics.entity';
import { MetricsRepository } from './metrics.repository';
import { User } from 'src/entities/users/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Metrics, User])],
    controllers: [MetricsController],
    providers: [MetricsService, MetricsRepository],
    exports: [MetricsRepository], // Exportar si es necesario en otro módulo
})
export class MetricsModule {}