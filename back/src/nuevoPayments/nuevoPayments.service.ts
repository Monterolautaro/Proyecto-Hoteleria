import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { BookingRepository } from './booking.repository';
import { DataSource } from 'typeorm';
import { Payment } from '../entities/payments.entity';
import { PaymentDto } from 'src/dto/payment.dto';
import { PaymentDetails } from 'src/entities/payments/paymentdetails.entity';
import { User } from 'src/entities/users/user.entity';
import { log } from 'console';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly bookingRepository: BookingRepository,
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  /**
   * Crea una intención de pago utilizando Stripe y gestiona las operaciones relacionadas
   * con la reserva y el pago en una transacción.
   *
   * @param amount - Monto del pago en centavos (por ejemplo, 1000 para $10.00)
   * @param id - ID del método de pago en Stripe
   * @param userId - ID del usuario que realiza la reserva
   * @param hotelId - ID del hotel donde se realiza la reserva
   * @param roomId - ID de la habitación reservada
   * @param checkIn - Fecha de check-in
   * @param checkOut - Fecha de check-out
   * @returns Promise<Stripe.PaymentIntent> - Retorna la intención de pago de Stripe
   */
  async createPaymentIntent(
    paymentData: PaymentDto,
  ): Promise<Stripe.PaymentIntent> {
    // Crear un queryRunner para gestionar la transacción
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { amount, id, userId, hotelId, rooms, checkIn, checkOut } =
      paymentData;

      console.log('antes delm payment intent', paymentData);
      
    try {
      // Crear la intención de pago en Stripe
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: 'Booking in Hotelify',
        payment_method: id,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        confirm: true,
      });
      
      if(!paymentIntent) throw Stripe.errors;
      
      console.log('despues del payment intent');
      // Crear la reserva y actualizar las métricas utilizando el queryRunner
      const booking = await this.bookingRepository.createBooking(
        userId,
        hotelId,
        rooms,
        checkIn,
        checkOut,
        queryRunner,
      );

      const user: User = await queryRunner.manager.findOne(User, {
        where: { user_id: userId },
      });

      console.log('después de guardar el booking', booking);
      
      await queryRunner.manager.save(
        // Guardar los detalles del pago en la base de datos usando stripePaymentIntentId
        await queryRunner.manager.create(Payment, {
          amount,
          date: new Date(),
          method: 'stripe',
          stripePaymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
          user: user,
          booking,
        }),
      );

      console.log('antes de confirmar transaccion', booking);
      
      // Confirmar la transacción
      await queryRunner.commitTransaction();
      // Retornar la intención de pago creada
      return paymentIntent;
    } catch (error: any) {
      // Revertir la transacción si algo falla
      await queryRunner.rollbackTransaction();

      return Stripe.errors[error.type];
      
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }
}

// documentado con ayuda de copilot
