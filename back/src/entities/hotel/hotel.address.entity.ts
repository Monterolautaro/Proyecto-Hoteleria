import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'
import { Hotel } from './hotel.entity'

export class Address {
    @PrimaryGeneratedColumn('uuid')
    address_id: string = uuid()

    @Column()
    hotel_id: string = uuid()

    @Column()
    city: string

    @Column()
    country: string

    @Column()
    street: string

    @OneToOne(() => Hotel, hotel => hotel.address)
    @JoinColumn({ name: 'hotel_id' })
    hotel!: Hotel
}