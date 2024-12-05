import { Booking } from 'src/entities/booking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('booked_rooms')
export class BookedRooms {
  @PrimaryGeneratedColumn('uuid')
  booked_rooms_id: string = uuid();

  @Column({
    nullable: true,
  })
  single_room_id: string;

  @Column({
    nullable: true,
  })
  double_room_id: string;

  @Column({
    nullable: true,
  })
  triple_room_id: string;

  @Column({
    nullable: true,
  })
  suite_room_id: string;

  @Column({
    nullable: true
  })
  number_of_rooms: number

  @OneToOne(() => Booking, (booking) => booking.booked_rooms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking?: Booking;
}
