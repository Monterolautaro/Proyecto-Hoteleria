import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { Details } from './hotel.details.entity';
import { Address } from './hotel.address.entity';
import { Availability } from './hotel.availability.entity';


@Entity({
    name: 'hotels'
})
export class Hotel {
    @PrimaryGeneratedColumn('uuid')
    hotel_id: string = uuid();
    
    @Column()
    name: string;

    @Column()
    details_id: string = uuid();

    @Column()
    address_id: string = uuid();

    @Column()
    availability_id: string = uuid();

    @Column()
    rooms_id: string = uuid();

    @Column()
    amenities_id: string = uuid();

    @OneToOne(() => Details, detail => detail.hotel_id)
    @JoinColumn({ name: 'detail_id'})
    details!: Details

    @OneToOne(() => Address, address => address.hotel_id)
    @JoinColumn({ name: 'address_id'})
    address!: Address

    @OneToOne(() => Availability, availability => availability.hotel_id)
    @JoinColumn({ name: 'availability_id'})
    availability!: Availability
}