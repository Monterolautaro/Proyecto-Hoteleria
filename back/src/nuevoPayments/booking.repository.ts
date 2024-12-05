import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, DataSource, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { User } from '../entities/users/user.entity';
import { Hotel } from '../entities/hotel/hotel.entity';
import { BookedRooms } from 'src/entities/hotel/rooms/booked.rooms.entity';
import { IBookingRooms } from 'src/Interfaces/booking-rooms.interface';
import { Availability } from 'src/entities/hotel/hotel.availability.entity';
import { RoomType } from 'src/entities/hotel/rooms/roomsType.entity';
import { Room } from 'src/entities/hotel/rooms/hotel.rooms.entity';

@Injectable()
export class BookingRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
    @InjectRepository(BookedRooms)
    private readonly bookedRoomsRepo: Repository<BookedRooms>,
  ) {}

  /**
   * Método para crear una reserva utilizando QueryRunner para gestionar la transacción.
   *
   * @param userId - ID del usuario que realiza la reserva
   * @param hotelId - ID del hotel donde se realiza la reserva
   * @param roomId - ID de la habitación reservada
   * @param checkIn - Fecha de check-in
   * @param checkOut - Fecha de check-out
   * @param queryRunner - QueryRunner para manejar la transacción
   * @returns Promise<Booking> - Retorna la reserva creada
   */
  async createBooking(
    userId,
    hotelId,
    rooms,
    checkIn,
    checkOut,
    queryRunner,
  ): Promise<Booking> {
    await queryRunner.connect();

    
    try {
      // Buscar al usuario por ID usando el queryRunner
      const user: User = await queryRunner.manager.findOne(User, {
        where: { user_id: userId },
      });
      
      // Buscar al hotel por ID usando el queryRunner
      const hotel: Hotel = await queryRunner.manager.findOne(Hotel, {
        where: { hotel_id: hotelId },
      });
      
      if(hotel.availability.totalRoomsLeft <= 5 ) throw new ConflictException('Not enough rooms available in hotel');
      
      // Verificar si el usuario o el hotel existen
      if (!hotel) throw new NotFoundException('Hotel no encontrados');
      if (!user) throw new NotFoundException('Usuario no encontrados');

      const bookedRooms: BookedRooms = new BookedRooms();

      const validRooms = rooms.filter((room) => room.rooms > 0);

      let totalRooms = 0;
      // itero sobre las rooms que llegan desde paymentData

      await validRooms.forEach(async (room: IBookingRooms) => {
        if (room.type === 'single') bookedRooms.single_room_id = room.roomId;
        if (room.type === 'double') bookedRooms.double_room_id = room.roomId;
        if (room.type === 'triple') bookedRooms.triple_room_id = room.roomId;
        if (room.type === 'suite') bookedRooms.suite_room_id = room.roomId;

        // actualizo el number of rooms
        if(!bookedRooms.number_of_rooms) bookedRooms.number_of_rooms = 0
        bookedRooms.number_of_rooms += room.rooms;


        // actualizo las habitaciónes de cada tipo, y además las voy añadiendo a total rooms
        totalRooms += room.rooms;


        const foundRoom = await queryRunner.manager.findOne(Room, {
          where: { room_id: room.roomId },
        });
        if (!foundRoom) throw new NotFoundException('Room not found');
        await queryRunner.manager.decrement(
          RoomType,
          { room_type_id: foundRoom.room_type.room_type_id },
          'rooms_left',
          room.rooms,
        );
      });

      //actualizo availability del hotel
      if (totalRooms > 0)
        await queryRunner.manager.decrement(
          Availability,
          { availability_id: hotel.availability.availability_id },
          'totalRoomsLeft',
          totalRooms,
        );
        
        await queryRunner.manager.save(bookedRooms);
        // crear la reserva
        
        const booking: Booking = await queryRunner.manager.create(Booking, {
          user: user,
          hotel: hotel,
          booked_rooms: bookedRooms,
          start_date: checkIn,
          end_date: checkOut,
        });
        await queryRunner.manager.save(booking);
        
        // bookedRooms.booking = booking;
        
        await queryRunner.manager.update(BookedRooms, bookedRooms.booked_rooms_id, {
          booking: booking
        })

      // Guardar los cambios en el hotel usando el queryRunner
      await queryRunner.manager.save(hotel);
      
      // Retornar la reserva creada
      return booking;
    } catch (error) {
      if(error instanceof ConflictException) throw error
      
      if(error instanceof NotFoundException) throw error

      throw new BadRequestException('Error creating booking', error);
    }
  }
}
