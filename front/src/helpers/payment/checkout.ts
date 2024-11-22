/*import MercadoPagoConfig, { Payment } from "mercadopago";

export const startPayment = () => {
  const client = new MercadoPagoConfig({
    accessToken: process.env.NEXT_ACCES_TOKEN!,
  });

  // Inicializar el módulo de pagos
  const payment = new Payment(client);

  // Crear el cuerpo de la solicitud
  const body = {
    transaction_amount: 50.0,
    description: "Libro",
    payment_method_id: "visa",
    payer: {
      email: "cliente@correo.com",
    },
  };

  // Realizar la solicitud
  payment
    .create({ body })
    .then((response: any) => {
      console.log("Pago creado:", response);
    })
    .catch((error: any) => {
      console.error("Error al crear pago:", error);
    });
};
*/
