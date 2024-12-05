import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { User } from '../entities/user.entity';
import {SuspendRepository } from './suspended.repository';
import { SuspendService } from './suspended.service';
import { AdminUserController } from './suspended.controller';
=======
import { SuspendRepository } from './suspended.repository';
import { SuspendService } from './suspended.service';
import { AdminUserController } from './suspended.controller';
import { User } from 'src/entities/users/user.entity';
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [SuspendRepository, SuspendService],
  exports: [],
})
export class SuspendedModule {}
<<<<<<< HEAD


=======
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
