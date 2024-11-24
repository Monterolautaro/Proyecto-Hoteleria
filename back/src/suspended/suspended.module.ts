import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import {SuspendRepository } from './suspended.repository';
import { SuspendService } from './suspended.service';
import { AdminUserController } from './suspended.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [SuspendRepository, SuspendService],
  exports: [],
})
export class SuspendedModule {}


