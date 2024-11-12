import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'
import { Hotel } from './hotel.entity'

export class Details {
    @PrimaryGeneratedColumn('uuid')
    detail_id: string = uuid()

    @Column()
    hotel_id: string = uuid()

    @Column()
    stars: number

    @Column()
    rating: number

    @Column()
    imgUrl: string

    @Column()
    description: string

    @OneToOne(()=> Hotel, hotel => hotel.details)
    @JoinColumn({name: 'hotel_id'})
    hotel!: Hotel
}