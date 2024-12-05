import {
  Injectable,
  BadRequestException,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { isUUID } from 'class-validator';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/users/user.entity';
import { Booking } from '../entities/booking.entity';
import { Payment } from '../entities/payments.entity';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PaymentRepository } from './mercadopago.repository';

@Injectable()
export class MercadopagoService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly paymentRepository: PaymentRepository,
    private dataSource: DataSource,
  ) {}

  /**
   * Crea una preferencia de pago utilizando MercadoPago y gestiona las operaciones relacionadas
   * con la reserva y el pago en una transacción.
   *
   * @param user_id - ID del usuario que realiza la reserva
   * @param createBooking - Detalles de la reserva
   * @returns Promise<{ init_point: string }> - Retorna el punto de inicio para la transacción en MercadoPago
   */
  async createBookingService(
    user_id: string,
    createBooking: any,
  ): Promise<{ init_point: string }> {
    // Crear un queryRunner para gestionar la transacción
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validar el ID del usuario
      if (!isUUID(user_id))
        throw new BadRequestException(`${user_id} is not a valid id`);

      // Buscar el usuario en la base de datos
      const user = await this.userRepository.findOne({
        where: { user_id },
        relations: ['credential'],
      });

      // Si el usuario no existe, lanzar una excepción
      if (!user) throw new NotFoundException('User not found');

      // Configurar el cliente de MercadoPago
      const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCES_TOKEN,
      });

      // Crear el cuerpo de la preferencia de pago
      const body = {
        items: [
          {
            id: 'booking_id',
            title: `Booking for ${createBooking.hotel_name}`,
            quantity: 1,
            unit_price: Number(createBooking.price),
            currency_id: 'USD',
          },
        ],
        back_urls: {
          success: `${process.env.URL_HOST_FRONT}bookings`,
          failure: `${process.env.URL_HOST_FRONTF}failure`,
          pending: `${process.env.URL_HOST_FRONT}pending`,
        },
        notification_url: `/`,
        metadata: {
          booking_id: createBooking.id,
          email: user.credential.email,
        },
      };

      // Crear la preferencia de pago en MercadoPago
      const preference = new Preference(client);
      const result = await preference.create({ body });

      // Crear la reserva y actualizar las métricas utilizando el queryRunner
      const booking = this.bookingRepository.create({
        start_date: createBooking.checkIn,
        end_date: createBooking.checkOut,
        user: { user_id: user.user_id },
      });

      await queryRunner.manager.save(Booking, booking);

      // Guardar los detalles del pago en la base de datos usando paymentId
      await queryRunner.manager.save(Payment, {
        amount: Number(createBooking.price),
        date: new Date(),
        method: 'mercadopago',
        paymentId: result.id,
        status: 'pending',
        user: { user_id: user.user_id },
        booking,
      });

      // Confirmar la transacción
      await queryRunner.commitTransaction();

      // Retornar el punto de inicio para la transacción
      return { init_point: result.init_point };
    } catch (error) {
      // Revertir la transacción si algo falla
      await queryRunner.rollbackTransaction();
      console.error('Error creating payment intent:', error);
      throw new BadGatewayException('Error creating payment intent');
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }

  /**
   * Obtiene los detalles de un pago desde la API de MercadoPago.
   *
   * @param paymentId - ID del pago
   * @returns Promise<any> - Retorna los detalles del pago
   */
  async getPaymentDetails(paymentId: string): Promise<any> {
    try {
      // Realizar la solicitud a la API de MercadoPago para obtener los detalles del pago
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCES_TOKEN}`,
          },
        },
      );

      // Retornar los datos del pago
      return response.data;
    } catch (error) {
      // Lanzar un error si falla la obtención de los detalles del pago
      throw new Error('Failed to fetch payment details');
    }
  }
}
