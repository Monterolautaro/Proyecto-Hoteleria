/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { StripeService } from './nuevoPayments.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment')
  async createPaymentIntent(@Body() paymentData: any) {
    
    
    return await this.stripeService.createPaymentIntent(paymentData);
  }
}
