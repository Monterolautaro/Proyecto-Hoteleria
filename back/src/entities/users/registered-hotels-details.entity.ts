import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Hotel } from '../hotel/hotel.entity';

@Entity({
  name: 'registered_hotels_details',
})
export class RegisteredHotelsDetails {
  @PrimaryGeneratedColumn('uuid')
  registered_hotels_details_id: string = uuid();

  @Column({ default: 0 })
  registered_hotels: number;

  @Column({ default: 0 })
  registered_rooms: number;

  @OneToMany(() => Hotel, (hotel) => hotel.registered_hotels_details, {
    onDelete: 'CASCADE',
  })
  hotels: Hotel[];

  @OneToOne(() => User, (user) => user.registered_hotels_details, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  owner: User;
}
