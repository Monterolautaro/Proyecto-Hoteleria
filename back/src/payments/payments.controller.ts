import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getPayments() {
    return this.paymentsService.getPayments();
  }

  @Get(':id')
  getPaymentById(id: string) {
    return this.paymentsService.getPaymentById(id);
  }

  @Delete(':id')
  deletePayment(id: string) {
    return this.paymentsService.deletePayment(id);
  }

  @Put(':id')
  updatePayment(id: string, payment: any) {
    return this.paymentsService.updatePayment(id, payment);
  }

  @Post()
  createPayment(payment: any) {
    return this.paymentsService.createPayment(payment);
  }
}
