import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    //private readonly paymentRepository: PaymentRepository,
  ) {
    //const stripeSecretKey = ConfigService.get<string>('STRIPE_SECRET_KEY');
    console.log("esta es la llave "+process.env.STRIPE_SECRET_KEY);
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      //apiVersion: '2022-11-15',
    apiVersion: '2024-11-20.acacia',
    });
  }

  async createPaymentIntent(amount: number, id: string) {
    try {
      const payment =  await this.stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: 'ECompra Hotelefy',
        payment_method: id,
        confirm: true,
      });

      // Guardar los datos en la base de datos
    /*await this.paymentRepository.savePayment({
      stripePaymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      description: payment.description,
      status: payment.status,
    });*/


      console.log("este es el payment "+payment);
      return payment;
    } catch (error) {
    console.log(error);
    throw new Error('Error al procesar el pago');
    }
  }
}
