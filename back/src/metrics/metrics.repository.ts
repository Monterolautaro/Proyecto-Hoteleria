import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Metrics } from '../entities/metrics/metrics.entity';
import { BookingMetrics } from 'src/entities/metrics/booking.metric.entity';
import { MetricTypes } from 'src/entities/metrics/metrics.types.entity';
import { SearchMetrics } from 'src/entities/metrics/search.metric.entity';
import { TimeMetrics } from 'src/entities/metrics/time.metrics.entity';
import { VisitsMetrics } from 'src/entities/metrics/visits.metric.entity';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class MetricsRepository {
    private recipient: number | null = null; // Inicialmente sin valor
    constructor(
        @InjectRepository(Metrics)
        private readonly metricsRepository: Repository<Metrics>,

        private readonly dataSource: DataSource,
    @InjectRepository(BookingMetrics) 
    private bookingMetricsRepository: Repository<BookingMetrics>,
    @InjectRepository(MetricTypes)
    private metricTypesRepository: Repository<MetricTypes>,
    @InjectRepository(SearchMetrics) 
    private searchMetricsRepository: Repository<SearchMetrics>,
    @InjectRepository(TimeMetrics) 
    private timeMetricsRepository: Repository<TimeMetrics>,
    @InjectRepository(VisitsMetrics)
    private visitsMetricsRepository: Repository<VisitsMetrics>,
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    /*@InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,*/
    ) {}


    async getMetrics() {
        try {
            return this.metricsRepository.find();
        } catch (error) {
            console.log('error', error);
        }
        
    }

    async postMetrics() {
        try {
            return this.metricsRepository.find();
        } catch (error) {
            console.log('ERROR: ', error);
        }
        
    }

    //*SERVICIOS DE TIEMPO DEL USUARIO

    async startLogin(){
        const now = new Date();
const totalMinutesSince1970 = Math.floor(now.getTime() / (1000 * 60)); // Convierte milisegundos a minutos
this.recipient=totalMinutesSince1970;

//console.log(`Minutos totales desde 1970: ${totalMinutesSince1970}`);

    }

    async endLogin(){
        const now = new Date();
        const totalMinutesSince1970 = Math.floor(now.getTime() / (1000 * 60)); // Convierte milisegundos a minutos
        
       // console.log(`Minutos totales desde 1970: ${totalMinutesSince1970}`);

        const valor=totalMinutesSince1970-this.recipient
        return valor
    }

    //************************************************************ */

    async insertMetrics() {
        //hotelData.map(async (hotelData) => {
          // Inicio query runner e inicio transaccion
          const queryRunner = this.dataSource.createQueryRunner();
          await queryRunner.connect();
          await queryRunner.startTransaction();
          try {
            //  Inserto entidad hotel
    
            const metrics = this.metricsRepository.create();
    
            const savedMetric = await queryRunner.manager.save(metrics);
    
            // Inserto address en la tabla
            const bookingsMetric = this.bookingMetricsRepository.create({
                total_bookings:1,
                cancelled_bookings:1,
                completed_bookings:1,
                metrics: savedMetric
            });
            await queryRunner.manager.save(bookingsMetric);
    
            const typesMetric = this.metricTypesRepository.create(
                {
                    metric_name: "",

                    metrics: savedMetric
                }
            );
            await queryRunner.manager.save(typesMetric);
    
            const searchMetric = this.searchMetricsRepository.create({
                total_searches: 1,
                searches_per_user: 1,
                non_user_searches: 1,
              metrics: savedMetric
            });
            await queryRunner.manager.save(searchMetric);
    
            const timeMetrics = this.timeMetricsRepository.create({
                session_duration: "",
                session_start_time: 1,
                session_end_time: 2,
                metrics: savedMetric
            });
            await queryRunner.manager.save(timeMetrics);
    

              const visitsMetrics = this.visitsMetricsRepository.create({
                total_visits: 1,
                average_duration: "",
                metrics: savedMetric
            });
            await queryRunner.manager.save(visitsMetrics);
    
            // confirmo la transacción
            await queryRunner.commitTransaction();
            return savedMetric;
          } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
          } finally {
            await queryRunner.release();
          }
       // });
      }
}