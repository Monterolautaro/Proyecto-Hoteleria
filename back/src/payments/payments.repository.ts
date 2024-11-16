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
    return 'payment getPayments'; //await this.paymentRepository.find();
  }

  async CreatePayment(payment: any) {
    return 'payment createPayment'; //await this.paymentRepository.save(payment);
  }

  async UpdatePayment(id: number, payment: any) {
    return 'payment updatePayment'; //await this.paymentRepository.update(id, payment);
  }

  async DeletePayment(id: number) {
    return 'payment deletePayment'; //await this.paymentRepository.delete(id);
  }

  async GetPaymentById(id: number) {
    return 'payment getPaymentById'; //await this.paymentRepository.findOneBy({ id });
  }
}
