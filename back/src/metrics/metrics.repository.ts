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
    ) { }


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

    async startLogin(user_id: string) {

        const user = await this.userRepository.findOne({
            where: { user_id },
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        user.total_visits += 1

        await this.userRepository.save(user);

        const now = new Date();
        const totalMinutesSince1970 = Math.floor(now.getTime() / (1000 * 60)); // Convierte milisegundos a minutos
        this.recipient = totalMinutesSince1970;

        //console.log(`Minutos totales desde 1970: ${totalMinutesSince1970}`);

    }

    async endLogin(user_id: string) {

        const user = await this.userRepository.findOne({
            where: { user_id },
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const now = new Date();
        const totalMinutesSince1970 = Math.floor(now.getTime() / (1000 * 60)); // Convierte milisegundos a minutos

        const valor = totalMinutesSince1970 - this.recipient
        

        user.average_session_duration += valor;

        const hours = Math.floor(user.average_session_duration / 60); // Dividir minutos totales entre 60
        const minutes = user.average_session_duration % 60;          // Minutos restantes después de las horas

        //console.log(`${valor} minutos equivalen a ${hours} horas y ${minutes} minutos.`);

        const horaYmin = hours + "hs " + minutes + "min"
        const visitas = user.total_visits;
        // Guardar los cambios en la base de datos
        await this.userRepository.save(user);
        // console.log(`Minutos totales desde 1970: ${totalMinutesSince1970}`);

        return {horaYmin, visitas}
    }
}
