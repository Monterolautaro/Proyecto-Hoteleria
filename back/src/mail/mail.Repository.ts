import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

interface EmailOptions {
  to: string;
  subject: string;
  context: any;
  template: string;
}

@Injectable()
export class MailRepository {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject, context, template }: EmailOptions) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context,
      });

      return { message: 'Correo enviado exitosamente' };
    } catch (error) {
      throw new Error(`Error al enviar correo: ${error.message}`);
    }
  }
}
