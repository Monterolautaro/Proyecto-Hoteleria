import { Body, Controller, Post, Param } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';

@Controller('booking')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  /**
   * Crea una nueva reserva y genera una preferencia de pago utilizando MercadoPago.
   *
   * @param user_id - ID del usuario que realiza la reserva
   * @param createBooking - Detalles de la reserva
   * @returns - Retorna el punto de inicio para la transacción en MercadoPago
   */
  @Post('/create/:id')
  createBookingController(
    @Param('id') user_id: string,
    @Body() createBooking: any,
  ) {
    return this.mercadopagoService.createBookingService(user_id, createBooking);
  }

  /**
   * Maneja los webhooks enviados por MercadoPago, obteniendo los detalles del pago.
   *
   * @param body - Cuerpo de la solicitud webhook de MercadoPago
   * @returns - Retorna los detalles del pago
   */
  @Post('/webhook')
  async webhookController(@Body() body: any) {

    if (body.type === 'payment') {
      const paymentId = body.data.id;
      try {
        const paymentDetails =
          await this.mercadopagoService.getPaymentDetails(paymentId);

        return paymentDetails;
      } catch (error) {
        console.error('Error fetching payment details:', error);
        return 'Error fetching payment details';
      }
    } else {
      return 'Invalid webhook type';
    }
  }
}
