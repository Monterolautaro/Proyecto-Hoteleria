import { v4 as uuid } from 'uuid';
import { Details } from './hotel.details.entity';
import { Address } from './hotel.address.entity';
import { Availability } from './hotel.availability.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from '../booking.entity';
import { Amenities } from './hotel.amenities.entity';
import { Room } from './hotel.rooms.entity';

@Entity({
  name: 'hotels',
})
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  hotel_id: string = uuid();

  @Column()
  name: string;

  @OneToOne(() => Amenities, (amenities) => amenities.hotel, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'amenities_id' })
  amenities!: Amenities;

  @OneToOne(() => Details, (detail) => detail.hotel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'detail_id' })
  details!: Details;

  @OneToOne(() => Address, (address) => address.hotel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'address_id' })
  address!: Address;

  @OneToOne(() => Availability, (availability) => availability.hotel, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'availability_id' })
  availability!: Availability;

  @OneToMany(() => Room, (room) => room.hotel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room!: Room[];

  @OneToMany(() => Booking, (booking) => booking.hotel, { onDelete: 'CASCADE' })
  @JoinColumn()
  booking!: Booking[];
}
