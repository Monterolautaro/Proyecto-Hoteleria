import { Controller, Patch, Body } from '@nestjs/common';
import { SuspendService } from './suspended.service';
import { User } from 'src/entities/user.entity';

@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly suspendService: SuspendService) {}

  @Patch('/suspend')
  async suspendUser(@Body() userSuspend: User) {
    const { name } = userSuspend;

      return await this.suspendService.suspendUser(name);

  }

  @Patch('/unsuspend')
  async unsuspendUser(@Body() userSuspend: User) {
    const { name } = userSuspend;

      return await this.suspendService.unsuspendUser(name);

  }
}

