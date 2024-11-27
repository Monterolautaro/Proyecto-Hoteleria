import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from "nodemailer";
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from 'src/Interfaces/mail.interface';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) { }

  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>("MAIL_HOST"),
      port: this.configService.get<number>("MAIL_PORT"),
      secure: false, // true for port 465, false for other ports
      auth: {
        user: this.configService.get<string>("MAIL_USER"),
        pass: this.configService.get<string>("MAIL_PASSWORD"),
      },
    });

    return transporter;
  }

  template(html: string, replacements: /*Record<string, string>*/string[]) {
    const replacementsMap = {};
    for (let i = 0; i < replacements.length; i += 2) {
      replacementsMap[replacements[i]] = replacements[i + 1];
    }
    return html.replace(
      /%(\w*)%/g, // or /{(\w*)}/g for "{this} instead of %this%"
      function(m, key) {
        return replacementsMap.hasOwnProperty(key) ? replacementsMap[key] : '';
      }
    )
  }

  async sendEmail(dto: SendEmailDto) {
    const { from,
      recipients,
      subject, } = dto;
    const html = dto.placeHolderReplacements ? this.template(dto.html, dto.placeHolderReplacements) : dto.html;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>("APP_NAME"),
        address: this.configService.get<string>("DEFAULT_MAIL_FROM"),
      },
      to: recipients,
      subject,
      html,
    };

    try {
      const result = await transport.sendMail(options);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
