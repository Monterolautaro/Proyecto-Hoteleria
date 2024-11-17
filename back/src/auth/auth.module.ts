import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Credentials } from 'src/entities/credentials.entity';
import { UserRepository } from 'src/Users/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credentials]), UserRepository
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
