import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Hotel } from './hotel.entity';

@Entity({
  name: 'availability',
})
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  availability_id: string = uuid();

  @Column()
  available: boolean;

  @Column()
  totalRoomsLeft: number;

  @OneToOne(() => Hotel, (hotel) => hotel.availability, { onDelete: 'CASCADE' })
  hotel!: Hotel;
}
