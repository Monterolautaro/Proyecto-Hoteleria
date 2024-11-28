import { Controller, Post, Body } from '@nestjs/common';
import { SendEmailDto } from 'src/Interfaces/mail.interface';
import { ModeloHTML } from './modelHTML/modelHtmlNotif';
import { MailService } from './mail.service';
/*npm install nodemailer
npm i --save @nestjs/config
npm i --save-dev @types/nodemailer*/

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendRegister')
  async sendEmailRegister(@Body() body: Record<string, string>) {
    const { name, email } = body;
    const dto: SendEmailDto = {
      //from: { name: 'Lucy', address: 'lucy@example.com'}, Esto seria un ejmplo
      recipients: [{ name: `${name}`, address: `${email}` }],
      subject: 'Hotelify',
      html: ModeloHTML,
      codigo: 10,
      //placeHolderReplacements: body,
    };
    //"<p><strong>hi %name%</strong>, your lucky number %number% won you $1.000.000</p><p>Cheers</p>"
    return await this.mailService.sendEmail(dto);
  }

  @Post('sendPago')
  async sendEmailPago(@Body() body: Record<string, string>) {
    const dto: SendEmailDto = {
      recipients: [{ name: '%name%', address: '%email%' }],
      subject: 'Hotelify',
      html: ModeloHTML,
      codigo: 10,
      //placeHolderReplacements: body,
    };
    return await this.mailService.sendEmail(dto);
  }

  @Post('sendHotel')
  async sendEmailHotel(
    @Body() /*body: Record<string, string>*/ name: string,
    email: string,
  ) {
    const dto: SendEmailDto = {
      recipients: [{ name: '%name%', address: '%email%' }],
      subject: 'Hotelify',
      html: ModeloHTML,
      codigo: 10,
      placeHolderReplacements: [name, email],
    };
    return await this.mailService.sendEmail(dto);
  }
}
