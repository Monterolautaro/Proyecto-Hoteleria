import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Credentials } from 'src/entities/credentials.entity';
import { UserRepository } from './users.repository';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { MetricsRepository } from 'src/metrics/metrics.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credentials]), // Importación de TypeOrmModule con la entidad User
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService, MetricsRepository],
  exports: [UserRepository, MetricsRepository],
})
export class UsersModule {}