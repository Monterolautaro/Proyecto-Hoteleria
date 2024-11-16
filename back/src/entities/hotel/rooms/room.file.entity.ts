import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { RoomType } from "../roomsType.entity";




export class RoomFile {
    @PrimaryGeneratedColumn('uuid')
    room_file_id: string = uuid()

    @Column()
    file_url: string;

    @ManyToOne(() => RoomType, (roomtype) => roomtype.files)
    @JoinColumn({ name: 'room_type_id' })
    room_type_id: RoomType

}