import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuspendRepository } from './suspended.repository';
import { SuspendService } from './suspended.service';
import { AdminUserController } from './suspended.controller';
import { User } from 'src/entities/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [SuspendRepository, SuspendService],
  exports: [],
})
export class SuspendedModule {}
