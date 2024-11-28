// mercadopago.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadopagoService } from './mercadopago.service';
import { PaymentRepository } from './mercadopago.repository';
import { MercadopagoController } from './mercadopago.controller';
import { User } from '../entities/users/user.entity';
import { Booking } from '../entities/booking.entity';
import { Payment } from '../entities/payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Booking, Payment])],
  providers: [MercadopagoService, PaymentRepository],
  controllers: [MercadopagoController],
})
export class MercadopagoModule {}
