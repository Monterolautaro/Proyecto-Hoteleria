<<<<<<< HEAD
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuid } from 'uuid';
import { config as dotenvConfig } from 'dotenv'; dotenvConfig({ path: 'D:\Escritorio\Proyecto-Hoteleria\back\.env' });
=======
/* import { MercadoPagoConfig, Preference } from 'mercadopago';
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d

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
<<<<<<< HEAD
  };
  
 export  const requestOptions = {
    idempotencyKey: uuid(),
  };
  
  payment.create({ body, requestOptions }).then(console.log).catch(console.log);
  
 

=======
  })
  .then(console.log)
  .catch(console.error);
  */
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d
