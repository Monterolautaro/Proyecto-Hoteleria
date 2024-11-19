import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Credentials } from 'src/entities/credentials.entity';
import { UserRepository } from 'src/users/user.Repository';
import { UsersModule } from 'src/users/users.Module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credentials]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UserRepository],
})
export class AuthModule {}
