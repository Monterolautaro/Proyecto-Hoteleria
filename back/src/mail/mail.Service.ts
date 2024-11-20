import { Injectable } from '@nestjs/common';
import { MailRepository } from './mail.repository';

interface EmailOptions {
  to: string;
  subject: string;
  context: any;
  template: string;
}

@Injectable()
export class MailService {
  constructor(private readonly mailRepository: MailRepository) {}

  async sendEmail(options: EmailOptions) {
    try {
      return await this.mailRepository.sendEmail(options);
    } catch (error) {
      throw new Error(`Error email: ${error.message}`);
    }
  }
}
