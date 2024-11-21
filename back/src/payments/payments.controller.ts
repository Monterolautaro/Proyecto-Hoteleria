import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getPayments() {
    return this.paymentsService.getPayments();
  }

  @Get(':id')
  getPaymentById(@Param('id') id: string) {
    return this.paymentsService.getPaymentById(id);
  }

  @Delete(':id')
  deletePayment(@Param('id') id: string) {
    return this.paymentsService.deletePayment(id);
  }

  @Put(':id')
  updatePayment(@Param('id') id: string, @Body() payment: any) {
    return this.paymentsService.updatePayment(id, payment);
  }

  /*@Post()
  createPayment(@Body() payment: any) {
    return this.paymentsService.createPayment(payment);
  }*/

  @Post('webhook')
  webhook(@Body() body: any) {
    console.log('Webhook recibido', body);
    // Procesar el evento recibido
    return 'OK';
  }
}
