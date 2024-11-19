import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.Service';
import { UserController } from './user.Controller';
import { UserRepository } from './user.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Credentials } from 'src/entities/credentials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credentials]), // Importación de TypeOrmModule con la entidad User
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
})
export class UsersModule {}
