import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() body: any) {
    const { to, subject, context } = body;

    return await this.mailService.sendEmail({
      to,
      subject,
      context,
      template: 'dynamic-email', // Nombre de la plantilla que usarás
    });
  }
}
