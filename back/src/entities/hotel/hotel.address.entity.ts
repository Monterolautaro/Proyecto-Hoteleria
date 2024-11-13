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
  name: 'address',
})
export class Address {
  @PrimaryGeneratedColumn('uuid')
  address_id: string = uuid();

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  street: string;

  @OneToOne(() => Hotel, (hotel) => hotel.address, { onDelete: 'CASCADE' })
  hotel!: Hotel;
}
