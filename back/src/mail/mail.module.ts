import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.Service';
import { MailController } from './mail.controller';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
