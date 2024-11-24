import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from 'src/Interfaces/mail.interface';
import { ModeloHTMLNotif } from './modelHTML/modelHtmlNotif';
import { ModeloHTMLPago } from './modelHTML/modelHtmlPago';
import { ModeloHTMLHotel } from './modelHTML/modelHtmlHotel';


@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendRegister')
  async sendEmailRegister(@Body() body: Record<string, string>) {
    const dto: SendEmailDto = {
      //from: { name: 'Lucy', address: 'lucy@example.com'}, Esto seria un ejmplo
      recipients : [{ name: '%name%', address: '%email%'}],
      subject: "Hotelefy",
      html: ModeloHTMLNotif,
      codigo: 10,
      //placeHolderReplacements: body,
    }
//"<p><strong>hi %name%</strong>, your lucky number %number% won you $1.000.000</p><p>Cheers</p>"
    return await this.mailService.sendEmail(dto);
  }

  @Post('sendPago')
  async sendEmailPago(@Body() body: Record<string, string>) {
    const dto: SendEmailDto = {
      //from: { name: 'Lucy', address: 'lucy@example.com'}, Esto seria un ejmplo
      recipients : [{ name: '%name%', address: '%email%'}],
      subject: "Hotelefy",
      html: ModeloHTMLPago,
      codigo: 10,
      //placeHolderReplacements: body,
    }
    return await this.mailService.sendEmail(dto);
  }

  @Post('sendHotel')
  async sendEmailHotel(@Body() /*body: Record<string, string>*/ name: string , email: string) {
    const dto: SendEmailDto = {
      //from: { name: 'Lucy', address: 'lucy@example.com'}, Esto seria un ejmplo
      recipients : [{ name: '%name%', address: '%email%'}],
      subject: "Hotelefy",
      html: ModeloHTMLHotel,
      codigo: 10,
      placeHolderReplacements: [name,email],
    }
    return await this.mailService.sendEmail(dto);
  }
}
