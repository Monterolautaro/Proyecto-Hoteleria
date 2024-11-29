import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
/*npm install nodemailer
npm i --save @nestjs/config
npm i --save-dev @types/nodemailer*/

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendRegister')
  async sendEmailRegister(@Body() body: Record<string, string>) {
    const { name, to } = body;
    return this.mailService.mailNotifLogin(to,name)
  }

  @Post('sendPago')
  async sendEmailPayments(@Body() body: Record<string, string>) {
    const { to } = body;
    return this.mailService.mailNotifPayments(to);
  }

  @Post('sendHotel')
  async sendEmailHotel(@Body() body: Record<string, string>) {
    const { to, codHotel } = body;
    return this.mailService.mailNotifHotel(to,codHotel);
  }
}
