/* import { MercadoPagoConfig, Preference } from 'mercadopago';

export const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCES_TOKEN,
});

const preference = new Preference(client);

preference
  .create({
    body: {
      items: [
        {
          id: '1',
          title: 'Mi producto',
          quantity: 1,
          unit_price: 2000,
        },
      ],
    },
  })
  .then(console.log)
  .catch(console.error);
  */
