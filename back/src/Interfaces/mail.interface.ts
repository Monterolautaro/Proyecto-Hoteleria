<<<<<<< HEAD
import { Address } from "nodemailer/lib/mailer"

export type SendEmailDto = {
    from?:Address;
    recipients: Address[];
    subject: string;
    html : string;
    codigo?: number;
    text?: string;
    placeHolderReplacements?: /*Record<string, string>*/string[];
};
=======
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
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
