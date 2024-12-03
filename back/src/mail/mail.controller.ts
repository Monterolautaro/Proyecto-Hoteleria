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
    this.mailService.setRecipient(to);
    return this.mailService.mailNotifLogin(name)
  }

  @Post('sendPago')
  async sendEmailComfirm(@Body() body: Record<string, string>) {
    const { to } = body;
    this.mailService.setRecipient(to);
    return this.mailService.mailNotifComfirm();
  }

  @Post('sendHotel')
  async sendEmailCode(@Body() body: Record<string, string>) {
    const { to, codigo } = body;
    this.mailService.setRecipient(to);
    return this.mailService.mailNotifCode(codigo);
  }
}
