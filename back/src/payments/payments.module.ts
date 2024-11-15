import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
})
export class PaymentsModule {}
