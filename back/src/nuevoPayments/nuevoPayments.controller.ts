/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { StripeService } from './nuevoPayments.service';
import { PaymentDto } from 'src/dto/payment.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment')
  async createPaymentIntent(@Body() paymentData: PaymentDto) {
    console.log(paymentData);
    
    return await this.stripeService.createPaymentIntent(paymentData);
  }
}
