import { Controller, Post, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Res() res: Response) {
    const session = await this.stripeService.createCheckoutSession();
    res.json({ id: session.id });
  }
}
