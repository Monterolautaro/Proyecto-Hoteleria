import { Module } from '@nestjs/common';
import { StripeController } from './nuevoPayments.controller';
import { StripeService } from './nuevoPayments.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
})
export class nuevoStripeModule {}
