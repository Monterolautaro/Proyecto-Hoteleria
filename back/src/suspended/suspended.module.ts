import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import {SuspendRepository } from './suspended.repository';
import { SuspendService } from './suspended.service';
import { AdminUserController } from './suspended.controller';
<<<<<<< HEAD
=======
import { User } from 'src/entities/users/user.entity';
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [SuspendRepository, SuspendService],
  exports: [],
})
export class SuspendedModule {}


