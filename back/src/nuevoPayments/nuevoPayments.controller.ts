/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { StripeService } from './nuevoPayments.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment')
  async createPaymentIntent(
    @Body('amount') amount: number,
    @Body('id') id: string,
    @Res() res: Response,
    @Body('userId') userId: string,
    @Body('hotelId') hotelId: string,
    @Body('roomId') roomId: string,
    @Body('checkIn') checkIn: Date,
    @Body('checkOut') checkOut: Date
  ) {
    try {
      const paymentIntent = await this.stripeService.createPaymentIntent(
        amount,
    id,
    userId,
    hotelId,
    roomId,
    checkIn,
    checkOut
      );

      //return paymentIntent;
      console.log('paymenst del controller: ' + paymentIntent);
      res.json({ message: 'Payment successfully completed', paymentIntent });
    } catch (error: any) {
      res.status(error.status || 400).json({ message: error.message });
    }
  }
}
