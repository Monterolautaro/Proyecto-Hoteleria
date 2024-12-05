import { v4 as uuid } from 'uuid';
import { Details } from './hotel.details.entity';
import { Address } from './hotel.address.entity';
import { Availability } from './hotel.availability.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from '../booking.entity';
import { Amenities } from './hotel.amenities.entity';
import { Room } from './rooms/hotel.rooms.entity';
import { User } from '../users/user.entity';
import { RegisteredHotelsDetails } from '../users/registered-hotels-details.entity';

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
    eager: true,
  })
  @JoinColumn({ name: 'amenities_id' })
  amenities!: Amenities;

  @OneToOne(() => Details, (detail) => detail.hotel, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details!: Details;

  @OneToOne(() => Address, (address) => address.hotel, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'address_id' })
  address!: Address;

  @OneToOne(() => Availability, (availability) => availability.hotel, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'availability_id' })
  availability!: Availability;

  @OneToMany(() => Room, (room) => room.hotel, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'room_id' })
  room!: Room[];

  @OneToMany(() => Booking, (booking) => booking.hotel, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  booking!: Booking[];

  @ManyToOne(() => User, (user) => user.hotels)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne(() => RegisteredHotelsDetails, (details) => details.hotels, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'registered_hotels_details_id' })
  registered_hotels_details?: RegisteredHotelsDetails;
}
