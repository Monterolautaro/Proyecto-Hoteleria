import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  getPayments() {
    return this.paymentsRepository.GetPayments();
  }

  getPaymentById(id: string) {
    return this.paymentsRepository.GetPaymentById(id);
  }

  createPayment(payment: any) {
    return this.paymentsRepository.CreatePayment(payment);
  }

  updatePayment(id: string, payment: any) {
    return this.paymentsRepository.UpdatePayment(id, payment);
  }

  deletePayment(id: string) {
    return this.paymentsRepository.DeletePayment(id);
  }
}
