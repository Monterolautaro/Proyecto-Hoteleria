import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Availability } from 'src/entities/hotel/hotel.availability.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Room } from 'src/entities/hotel/hotel.rooms.entity';
import { RoomType } from 'src/entities/hotel/roomsType.entity';
import { Repository } from 'typeorm';
import { connectionSource } from 'src/config/typeorm';
import { Details } from 'src/entities/hotel/hotel.details.entity';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class HotelsRepository {
  constructor(
    @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>,
    @InjectRepository(Amenities) private amenitiesRepository: Repository<Amenities>,
    @InjectRepository(Details) private detailsRepository: Repository<Details>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(Availability) private availabilityRepository: Repository<Availability>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(RoomType) private roomTypeRepository: Repository<RoomType>,
  ) {}
  async insertHotel(hotelData: any) {
  hotelData.map(async (hotelData) => {
    // Inicio query runner e inicio transaccion
    const queryRunner = connectionSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //  Inserto entidad hotel

      const hotel = this.hotelRepository.create({
        name: hotelData.name,
        // si es necesario, aca podemos agregar mas propiedades
      });

      const savedHotel = await queryRunner.manager.save(hotel);


      // Inserto address en la tabla
      const address = this.addressRepository.create({
        city: hotelData.address.city,
        country: hotelData.address.country,
        street: hotelData.address.street,
        hotel: savedHotel,
      });
      await queryRunner.manager.save(address);

      // Inserto availability
      const availability = this.availabilityRepository.create({
        available: hotelData.availability.available,
        totalRoomsLeft: hotelData.availability.totalRoomsLeft,
        hotel: savedHotel,
      });
      await queryRunner.manager.save(availability);

      const details = this.detailsRepository.create({
        stars: hotelData.details.stars,
        rating: hotelData.details.rating,
        imgUrl: hotelData.details.imgUrl,
        description: hotelData.details.description,
        hotel: savedHotel,
      })
      await queryRunner.manager.save(details);

      const amenities = this.amenitiesRepository.create({
        pool: hotelData.amenities.pool,
        spa: hotelData.amenities.spa,
        gym: hotelData.amenities.gym,
        restaurant: hotelData.amenities.restaurant,
        bar: hotelData.amenities.bar,
        hotel: savedHotel,
      });
      await queryRunner.manager.save(amenities);
      
      interface RoomData {
        price: number;
        currency: string;
        roomsLeft: number;
        description: string;
      }
      console.log(hotelData.rooms);
     

        //// Inserto tipos de habitación y habitaciónes
        for (const [roomTypeName, roomData] of Object.entries(hotelData.rooms)) {
          const roomDataTyped = roomData as RoomData;
          
          // Inserto RoomType
          const roomType = this.roomTypeRepository.create({
            price: roomDataTyped.price,
            currency: roomDataTyped.currency,
            rooms_left: roomDataTyped.roomsLeft,
            description: roomDataTyped.description,
          });
          const savedRoomType = await queryRunner.manager.save(roomType);
          

        // Inserto room asociado al tipo y al hotel
        const room = this.roomRepository.create({
          type: roomTypeName, 
          hotel: savedHotel,
          room_type: savedRoomType,
        });
        await queryRunner.manager.save(room);
      }

      // confirmo la transacción
      await queryRunner.commitTransaction();
      return savedHotel;

    } catch (error) {
      console.log(error);
      
      // Revierto la transacción si hay algun error
      await queryRunner.rollbackTransaction();
      throw error;

    } finally {
      // Libero el runner (tanto si hubo error o no)

      await queryRunner.release();
    }
  })
  }

  async getHotelById(id: string) {
    const hotel = await this.hotelRepository.findOne({ where: { hotel_id: id }, 
      relations: {
        address: true,
        availability: true,
        details: true,
        amenities: true,
        room: {
          room_type: true,
        },
      }});
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  async getHotels() {
    try {
      const hotels = await this.hotelRepository.find({
        relations: {
          address: true,
          availability: true,
          details: true,
          amenities: true,
          room: {
            room_type: true,
          },
        },
      });
      return hotels;
    } catch (error) {
    
      throw new BadRequestException('Error loading hotels', error); 
    }
  }
}