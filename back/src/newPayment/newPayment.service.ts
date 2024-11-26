/* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import Stripe from 'stripe';

// @Injectable()
// export class StripeService {
//   private stripe: Stripe;

//   constructor() {
//     //const stripeSecretKey = ConfigService.get<string>('STRIPE_SECRET_KEY');
//     this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//       //apiVersion: '2022-11-15',
//       apiVersion: '2024-11-20.acacia',
//     });
//   }

//   async createPaymentIntent(amount: number, id: string) {
//     try {
//       return await this.stripe.paymentIntents.create({
//         amount,
//         currency: 'USD',
//         description: 'ECompra Hotelefy',
//         payment_method: id,
//         automatic_payment_methods: {
//           enabled: true,
//           allow_redirects: 'never', // Deshabilitar métodos con redirección
//         },
//         confirm: true,
//       });
//     } catch (error: any) {
//       console.log(error);
//       throw {
//         status: 400,
//         message: error.raw?.message || 'Payment failed due to an unknown error',
//       };
//     }
//   }
// }
