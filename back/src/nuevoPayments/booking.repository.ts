import { Injectable } from '@nestjs/common';
import { Repository, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { User } from '../entities/users/user.entity';
import { Hotel } from '../entities/hotel/hotel.entity';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
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
    userId: string,
    hotelId: string,
    roomId: string,
    checkIn: Date,
    checkOut: Date,
    queryRunner: QueryRunner
  ): Promise<Booking> {
    // Inicio query runner e inicio transacción
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Buscar al usuario por ID usando el queryRunner
      const user = await queryRunner.manager.findOne(User, { where: { user_id: userId } });
      
      // Buscar al hotel por ID usando el queryRunner
      const hotel = await queryRunner.manager.findOne(Hotel, { where: { hotel_id: hotelId } });

      // Verificar si el usuario o el hotel existen
      if (!user || !hotel) {
        throw new Error('Usuario o hotel no encontrados');
      }

      // Crear una nueva reserva
      const booking = this.bookingRepo.create({ user, hotel, room_id: roomId, checkIn, checkOut });
      
      // Guardar la reserva usando el queryRunner
      await queryRunner.manager.save(booking);

      // Actualizar la disponibilidad de las habitaciones del hotel
      hotel.room.forEach(room => {
        if (room.room_id === roomId) {
          room.room_type.rooms_left -= 1;
        }
      });

      // Restar el total de habitaciones disponibles del hotel
      hotel.availability.totalRoomsLeft -= 1;

      // Guardar los cambios en el hotel usando el queryRunner
      await queryRunner.manager.save(hotel);

      // Confirmo la transacción
      await queryRunner.commitTransaction();

      // Retornar la reserva creada
      return booking;
    } catch (error) {
      // Revertir la transacción si hay algún error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }
}

// Documentado con ayuda de Copilot
