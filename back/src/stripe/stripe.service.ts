import { Injectable, Inject } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe) {}

  async createCheckoutSession() {
    return this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Hotel La Campiña',
            },
            unit_amount: 260,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://tuweb.com/success',
      cancel_url: 'https://tuweb.com/cancel',
    });
  }
}
