import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metrics } from '../entities/metrics/metrics.entity';

@Injectable()
export class MetricsRepository {
    constructor(
        @InjectRepository(Metrics)
        private readonly metrics: Repository<Metrics>,
    ) {}


    async getMetrics() {
        try {
            return this.metrics.find();
        } catch (error) {
            console.log('error', error);
        }
        
    }
}