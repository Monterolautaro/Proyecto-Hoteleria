import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { Payment } from './payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    //Luego poner aca la entidad que sea necesario para guardarlo en la base de datos
    //@InjectRepository(Payment)
    //private readonly paymentRepo: Repository<Payment>,
  ) {}

  //Metodo para guardarlo en la base de datos
  /*async savePayment(paymentData: Partial<Payment>): Promise<Payment> {
    const payment = this.paymentRepo.create(paymentData);
    return await this.paymentRepo.save(payment);
  }*/
}
