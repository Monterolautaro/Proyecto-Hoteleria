import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export async function whenRegister(email: string) {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: `${email}`, // list of receivers
    subject: 'Registro', // Subject line
    text: 'Te has registrado correctamente en Hotelify', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
}
