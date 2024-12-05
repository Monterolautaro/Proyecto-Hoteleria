import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RolesDecorator } from 'decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'roles.enum';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  getPayments() {
    return this.paymentsService.getPayments();
  }

  @Get(':id')
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  getPaymentById(@Param('id') id: string) {
    return this.paymentsService.getPaymentById(id);
  }

  @Delete(':id')
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  deletePayment(@Param('id') id: string) {
    return this.paymentsService.deletePayment(id);
  }

  @Put(':id')
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  updatePayment(@Param('id') id: string, @Body() payment: any) {
    return this.paymentsService.updatePayment(id, payment);
  }

  @Post()
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  /*@Post()
  createPayment(@Body() payment: any) {
    return this.paymentsService.createPayment(payment);
  }*/
  @Post('webhook')
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  webhook(@Body() body: any) {
    // Procesar el evento recibido
    return 'OK';
  }
}
