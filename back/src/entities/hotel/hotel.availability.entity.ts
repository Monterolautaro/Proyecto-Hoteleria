import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { Hotel } from './hotel.entity';

export class Availability {
    @PrimaryGeneratedColumn('uuid')
    availability_id: string = uuid()

    @Column()
    hotel_id: string = uuid()

    @Column()
    available: boolean;

    @Column()
    totalRoomsLeft: number

    @OneToOne(() => Hotel, hotel => hotel.availability_id)
    @JoinColumn({ name: 'hotel_id' })
    hotel!: Hotel
}