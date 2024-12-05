import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private recipient: string | null = null; // Inicialmente sin valor
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async mailNotifLogin(name: string) {
    const ModeloHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Hotelify</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f3f4f6;
            color: #333;
        }
        .container {
            max-width: 100%;
            width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }
        .header {
            background-color: #009688;
            color: #ffffff;
            text-align: center;
            padding: 30px 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
        }
        .content {
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .content p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            background-color: #009688;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.9rem;
            color: #777;
            background-color: #f0f0f0;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 600px) {
            .container {
                width: 100%;
                margin: 15px auto;
            }
            .header h1 {
                font-size: 2rem;
            }
            .content p {
                font-size: 1rem;
            }
            .button {
                width: 80%;
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bienvenido a Hotelify</h1>
        </div>
        <div class="content">
            <p>Felicidades, su usuario <strong>${name}</strong> ha sido creado exitosamente. Muchas gracias por inscribirse en nuestra página Hotelify. Estamos emocionados de tenerlo con nosotros.</p>
            <a href="https://www.hotelify.com" class="button">Visitar Sitio</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Hotelify. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>

`;

    const msg = {
      to: this.recipient,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Login to hotelefy',
      html: ModeloHTML,
    };

    await sgMail.send(msg);
  }

  async mailNotifCode(codigo: string) {
    const ModeloHTMLHotel = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Hotelefy</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
            color: #333;
        }
        .blue-border {
            height: 7px;
            background-color: #012d8a;
            width: 95%;
            margin: 0 auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            padding: 20px;
            text-align: center;
            background-color: #28a745;
            color: #fff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header h1 {
            margin: 0;
            font-size: 2rem;
        }
        .content {
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .content p {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .content h2 {
            font-size: 1.5rem;
            color: #28a745;
            margin: 0;
        }
        .cta-button {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            color: white;
            background-color: #012d8a;
            border-radius: 20px;
            text-decoration: none;
            font-size: 16px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.9rem;
            color: #777;
            background-color: #f0f0f0;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .social-icons a {
            margin: 0 5px;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .header h1 {
                font-size: 1.5rem;
            }
            .content p {
                font-size: 0.9rem;
            }
            .content h2 {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bienvenido a Hotelefy</h1>
        </div>
        <div class="blue-border"></div>
        <div class="content">
            <p>A continuación está el código de verificación del usuario. ¡Muchas gracias!</p>
            <h2>${codigo}</h2>
        </div>
        <div class="footer">
            <p>&copy; 2024 Hotelefy. Todos los derechos reservados.</p>
            <div class="social-icons">
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
            </div>
        </div>
    </div>
</body>
</html>
`;
    const msg = {
      to: this.recipient,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'verification hotel',
      html: ModeloHTMLHotel,
    };

    await sgMail.send(msg);
  }

  async mailNotifComfirm() {
    const ModeloHTMLPago = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación del usuario - Hotelefy</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(to bottom, #00bfa5 30%, #ffffff 30%);
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }
        .header {
            background-color: #009688;
            color: #ffffff;
            text-align: center;
            padding: 30px 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
        }
        .content {
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .content p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.9rem;
            color: #777;
            background-color: #f0f0f0;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 600px) {
            .header h1 {
                font-size: 2rem;
            }
            .content p {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verificación del usuario</h1>
        </div>
        <div class="content">
            <p>Su cuenta ha sido verificada correctamente. ¡Gracias por unirse a Hotelefy!</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Hotelefy. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>

`;
    const msg = {
      to: this.recipient,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Welcome to Club Fellini Bar!',
      html: ModeloHTMLPago,
    };

    await sgMail.send(msg);
  }

  setRecipient(email: string): void {
    this.recipient = email;
  }
}

