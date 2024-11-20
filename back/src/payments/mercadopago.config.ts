import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuid } from 'uuid';
import { config as dotenvConfig } from 'dotenv'; dotenvConfig({ path: 'D:\Escritorio\Proyecto-Hoteleria\back\.env' });

export const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_TEST_ACCESS_TOKEN,
    options: {
        timeout: 60000,
        idempotencyKey: 'abc'
    },
});

export const payment = new Payment(client);

export const body = {
    transaction_amount: 12.34,
    description: 'Descripción del pago',
    payment_method_id: 'visa',
    payer: {
      email: 'test_user@test.com',
    },
  };
  
 export  const requestOptions = {
    idempotencyKey: uuid(),
  };
  
  payment.create({ body, requestOptions }).then(console.log).catch(console.log);
  
 

