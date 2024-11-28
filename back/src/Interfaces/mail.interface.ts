import { Address } from 'nodemailer/lib/mailer';

export type SendEmailDto = {
  from?: Address;
  recipients: Address[];
  subject: string;
  html: string;
  codigo?: number;
  text?: string;
  placeHolderReplacements?: /*Record<string, string>*/ string[];
};
