import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entities/payments.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  // Método para guardarlo en la base de datos
  async savePayment(paymentData: Partial<Payment>): Promise<Payment> {
    const payment = this.paymentRepo.create(paymentData);
    return await this.paymentRepo.save(payment);
  }
}
