import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailRepository } from './mail.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.your-email-provider.com', // Cambia por tu proveedor (por ejemplo: smtp.gmail.com)
        port: 587, // Usa el puerto correspondiente (587 para TLS, 465 para SSL)
        secure: false, // Cambiar a true si usas SSL
        auth: {
          user: 'your-email@example.com',
          pass: 'your-email-password',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService, MailRepository],
})
export class MailModule {}
