import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'
import { Room } from './hotel.rooms.entity';

export class RoomType {
    @PrimaryGeneratedColumn('uuid')
    room_type_id: string = uuid()

    @Column()
    rooms_id: string = uuid()

    @Column()
    type: string;

    @Column()
    price: number;

    @Column()
    currency: string;

    @Column()
    rooms_left: number;

    @Column()
    description: string;

    @OneToOne(() => Room, room => room.room_type)
    @JoinColumn({ name: 'room_id' })
    room!: Room

}