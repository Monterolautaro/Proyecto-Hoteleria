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
  name: 'amenities',
})
export class Amenities {
  @PrimaryGeneratedColumn('uuid')
  amenities_id: string = uuid();

  @Column({ default: false })
  pool: boolean;

  @Column({ default: false })
  gym: boolean;

  @Column({ default: false })
  spa: boolean;

  @Column({ default: false })
  restaurant: boolean;

  @Column({ default: false })
  bar: boolean;

  @OneToOne(() => Hotel, (hotel) => hotel.amenities, { onDelete: 'CASCADE' })
  hotel!: Hotel;
}
