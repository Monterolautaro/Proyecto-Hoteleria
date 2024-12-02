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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Hotelefy</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(to bottom, cyan 30%, white 30%);
        }
        h1 {
            text-align: center;
            font-size: 2.5rem;
            color: #333333;
            margin-top: 50px;
        }
        img {
            display: block;
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
        }
        p {
            text-align: center;
            font-size: 1.2rem;
            color: #555555;
            margin: 20px;
        }
    </style>
</head>
<body>
    <h1>Bienvenido a Hotelefy</h1>
    <p>Felicidades, su usuario ${name} ha sido creado exitosamente. Muchas gracias por inscribirse en nuestra página Hotelefy.</p>
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
<html lang="en">
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
    }
  .blue-border {
    height: 7px;
    background-color: #012d8a;
    width: 95%;
    margin: 0 auto;
    }
  .transaction-info {
    margin: 0;
    }
  
  .container {
    max-width: 500px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 20px;
    padding-bottom: 0;
    padding-top: 0;
    }
    .header {
    padding: 10px;
    text-align: left;
    }

  .footer,
  .social-icons,
  .info {
    text-align: center;
  }
  .transaction-info p {
    margin: 0;
    padding: 5px 0;
    border-top: 1px solid rgb(92, 124, 199);
    color: black;
  }
  .social-icons a {
    margin: 0 5px;
    text-decoration: none;
  }
  .cta-button {
    text-align: center;
    display: inline-block;
    margin: 20px 0;
    padding: 10px 20px;
    color: white;
    background-color: #012d8a;
    border-radius: 20px;
    text-decoration: none;
    font-size: 16px;
  }
        img {
            display: block;
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
        }
        p {
            text-align: center;
            font-size: 1.2rem;
            color: #555555;
            margin: 20px;
        }
    </style>
</head>
<body>
    <h1>Codigo de verificacion del hotel</h1>
    <p>A continuacion esta el codigo de verificacion del usuario, mucha gracias.</p>
    <h2>${codigo}</h2>
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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Hotelefy</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(to bottom, cyan 30%, white 30%);
        }
        h1 {
            text-align: center;
            font-size: 2.5rem;
            color: #333333;
            margin-top: 50px;
        }
        img {
            display: block;
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
        }
        p {
            text-align: center;
            font-size: 1.2rem;
            color: #555555;
            margin: 20px;
        }
    </style>
</head>
<body>
    <h1>Verificacion del usuario</h1>
    <p>Su cuenta a sido verificada correctamente!!!.</p>
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