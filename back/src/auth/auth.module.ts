import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { Credentials } from 'src/entities/credentials.entity';
import { UserRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { VerificationCode } from 'src/entities/verification-codes.entity';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from '@sendgrid/mail';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credentials, VerificationCode]),
    UsersModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UserRepository, MailService],
})
export class AuthModule {}
