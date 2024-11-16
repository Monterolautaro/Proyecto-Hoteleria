import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Room } from './hotel.rooms.entity';

@Entity({
  name: 'rooms_type',
})
export class RoomType {
  @PrimaryGeneratedColumn('uuid')
  room_type_id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column()
  currency: string;

  @Column()
  rooms_left: number;

  @Column()
  description: string;

  @OneToMany(() => Room, (room) => room.room_type)
  @JoinColumn({ name: 'room_id' })
  rooms!: Room[];
}
