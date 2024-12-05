import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Availability } from 'src/entities/hotel/hotel.availability.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Room } from 'src/entities/hotel/rooms/hotel.rooms.entity';
import { RoomType } from 'src/entities/hotel/rooms/roomsType.entity';
import { DataSource, Repository } from 'typeorm';
import { Details } from 'src/entities/hotel/hotel.details.entity';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/entities/users/user.entity';
import { RegisteredHotelsDetails } from 'src/entities/users/registered-hotels-details.entity';
import { error } from 'console';

@Injectable()
export class HotelsRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>,
    @InjectRepository(Amenities)
    private amenitiesRepository: Repository<Amenities>,
    @InjectRepository(Details) private detailsRepository: Repository<Details>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
  ) {}
  async insertHotel(hotelData: any) {
    hotelData.map(async (hotelData) => {
      // Inicio query runner e inicio transaccion
      const queryRunner = this.dataSource.createQueryRunner();
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
        });
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

        //// Inserto tipos de habitación y habitaciónes
        for (const [roomTypeName, roomData] of Object.entries(
          hotelData.rooms,
        )) {
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
        // Revierto la transacción si hay algun error
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        // Libero el runner (tanto si hubo error o no)

        await queryRunner.release();
      }
    });
  }

  async getHotelById(id: Hotel['hotel_id']): Promise<Hotel> {
    try {
      const hotel = await this.hotelRepository.findOne({
        where: { hotel_id: id },
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

      if (!hotel) {
        throw new NotFoundException('Hotel not found');
      }
      return hotel;
    } catch (error) {
      throw new BadRequestException(`Error getting hotel with ID ${id}`, error);
    }
  }

  async getHotels(page, limit): Promise<Hotel[]> {
    try {
      const skip = (page - 1) * limit;

      const hotels = await this.hotelRepository.find({
        take: limit,
        skip: skip,
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
      throw new BadRequestException('Error getting hotels', error);
    }
  }

  async createHotelByOwner(owner_id, hotelData: any) {
    // Inicio query runner e inicio transaccion
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //  Inserto entidad hotel

      const owner: User = await queryRunner.manager.findOne(User, {
        where: { user_id: owner_id },
      });

      const hotel: Hotel = this.hotelRepository.create({
        name: hotelData.name,
        owner: owner,
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

      const details = this.detailsRepository.create({
        stars: hotelData.details.stars,
        rating: hotelData.details.rating,
        imgUrl: hotelData.details.imgUrl,
        description: hotelData.details.description,
        hotel: savedHotel,
      });
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

      const availability = this.availabilityRepository.create({
        available: hotelData.availability.available,
        totalRoomsLeft: hotelData.availability.totalRoomsLeft,
        hotel: savedHotel,
      });

      await queryRunner.manager.save(availability);

      const hotelRooms = availability.totalRoomsLeft;

      let registeredHotelsDetails = await queryRunner.manager.findOne(
        RegisteredHotelsDetails,
        {
          where: { owner: { user_id: owner.user_id } },
          relations: ['hotels'], // incluimos las habitaciónes porque después hay que actualizarlas con el nuevo hotel
        },
      );

      if (!registeredHotelsDetails) {
        registeredHotelsDetails = await queryRunner.manager.create(
          RegisteredHotelsDetails,
          {
            hotels: [savedHotel],
            owner: owner,
            registered_hotels: 1, // Al ser el primer hotel, lo inicio con 1
            registered_rooms: hotelRooms,
          },
        );

        // guardo
        registeredHotelsDetails = await queryRunner.manager.save(
          registeredHotelsDetails,
        );

        await queryRunner.manager.update(
          User,
          { user_id: owner_id },
          { registered_hotels_details: registeredHotelsDetails },
        );
      } else {
        // si es un hotel ya registrado, lo actualizo
        registeredHotelsDetails.registered_hotels += 1;
        registeredHotelsDetails.registered_rooms +=
          hotelData.availability.totalRoomsLeft; // agregamos las habitaciónes que se agregaron
        registeredHotelsDetails.hotels.push(savedHotel); // agregamos el nuevo hotel al array

        registeredHotelsDetails = await queryRunner.manager.save(
          registeredHotelsDetails,
        );
      }

      // confirmo la transacción
      await queryRunner.commitTransaction();
      return savedHotel;
    } catch (error) {
      // Revierto la transacción si hay algun error
      await queryRunner.rollbackTransaction();
      return {
        status: 400,
        message: `An error has ocurred creating user`,
        error,
      };
    } finally {
      // Libero el runner (tanto si hubo error o no)

      await queryRunner.release();
    }
  }

  async deleteHotel(hotel_id: string): Promise<any> {
    try {
      const foundHotel = await this.hotelRepository.findOneBy({ hotel_id })
      
      if (!foundHotel) throw new NotFoundException(`Hotel not found`);

      await this.hotelRepository.delete({ hotel_id });

      return { status: 'success', message: `Hotel has been deleted` };
    } catch (error) {
      
      if(error instanceof NotFoundException){
        throw error.message
      }
      
      throw new BadRequestException('Something got wrong deleting hotel', error);
    }
  }
}
