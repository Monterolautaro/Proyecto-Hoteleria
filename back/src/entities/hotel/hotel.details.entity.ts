import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Hotel } from './hotel.entity';

@Entity({
  name: 'details',
})
export class Details {
  @PrimaryGeneratedColumn('uuid')
  detail_id: string = uuid();

  @Column('float')
  stars: number;

  @Column('float')
  rating: number;

  @Column()
  imgUrl: string;

  @Column()
  description: string;

  @OneToOne(() => Hotel, (hotel) => hotel.details)
  hotel!: Hotel;
}
