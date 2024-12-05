import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Room } from './hotel.rooms.entity';

@Entity({
  name: 'room_files',
})
export class RoomFile {
  @PrimaryGeneratedColumn('uuid')
  room_file_id: string = uuid();

  @Column()
  file_url: string;

  @ManyToOne(() => Room, (room) => room.files)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
