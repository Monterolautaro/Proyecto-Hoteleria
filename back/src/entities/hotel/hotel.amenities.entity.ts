import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'
import { Hotel } from './hotel.entity';

export class Amenities {
    @PrimaryGeneratedColumn('uuid')
    amenities_id: string = uuid()

    @Column()
    hotel_id: string = uuid()

    @Column()
    pool: boolean;

    @Column()
    gym: boolean;

    @Column()
    spa: boolean;

    @Column()
    restaurant: boolean;

    @Column()
    bar: boolean;


    @OneToOne(() => Hotel, hotel => hotel.amenities_id)
    @JoinColumn({ name: 'hotel_id' })
    hotel!: Hotel
}