import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
// import { client } from './mercadopago.config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async getPayments() {
    return this.paymentsRepository.GetPayments();
  }

  async getPaymentById(id: string) {
    return this.paymentsRepository.GetPaymentById(id);
  }

  /*async createPayment(paymentDetails: any) {
    const body = {
      transaction_amount: paymentDetails.amount,
      description: paymentDetails.description,
      payment_method_id: paymentDetails.methodId,
      payer: {
        email: paymentDetails.email,
      },
    };
  
    const requestOptions = {
      idempotencyKey: uuid(),
    };

    return payment.create({ body, requestOptions })
      .then((response) => {
        // Guardar el pago en la base de datos
        return this.paymentsRepository.CreatePayment((response as any).body);
      })
      .catch((error) => {
        throw new Error(`Error al crear el pago: ${error.message}`);
      });
  }*/

  async updatePayment(id: string, payment: any) {
    return this.paymentsRepository.UpdatePayment(id, payment);
  }

  async deletePayment(id: string) {
    return this.paymentsRepository.DeletePayment(id);
  }
}
