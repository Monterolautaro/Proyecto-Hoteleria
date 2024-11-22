import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async GetPayments() {
    try {
      return await this.paymentRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async CreatePayment(payment: Partial<Payment>) {
    try {
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw error;
    }
  }

  async UpdatePayment(id: string, payment: any) {
    return await this.paymentRepository.update(id, payment);
  }

  async DeletePayment(id: string) {
    return await this.paymentRepository.delete(id);
  }

  async GetPaymentById(id: string) {
    return await this.paymentRepository.findOneBy({ payment_id: id });
  }
}
