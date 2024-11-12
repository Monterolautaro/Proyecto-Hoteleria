import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'
import { RoomType } from './roomsType.entity'


@Entity({
    name: 'rooms'
})
export class Room {

    @PrimaryGeneratedColumn('uuid')
    room_id: string = uuid()

    @Column()
    hotel_id: string = uuid()

    @OneToOne(() => RoomType, room_type => room_type.rooms_id)
    @JoinColumn({ name: 'room_type_id' })
    room_type!: RoomType
}