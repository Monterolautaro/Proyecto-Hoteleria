import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentRepository } from './nuevoPayments.repository';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createPaymentIntent(amount: number, id: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: 'ECompra Hotelefy',
        payment_method: id,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        confirm: true,
      });

      // Guardar los detalles del pago en la base de datos
      await this.paymentRepository.savePayment({
        amount,
        date: new Date(),
        method: 'stripe',
        payment_id: paymentIntent.id,
        status: paymentIntent.status,
      });

      return paymentIntent;
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      throw new Error(error.raw.message);
    }
  }
}
