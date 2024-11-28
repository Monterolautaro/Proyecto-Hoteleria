import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import { SuspendService } from './suspended.service';
import { RolesDecorator } from 'decorators/roles.decorator';
import { Roles } from 'roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/entities/users/user.entity';

@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly suspendService: SuspendService) {}

  // @RolesDecorator(Roles.admin)
  // @UseGuards(AuthGuard, RolesGuard)
  // @Patch('/suspend')
  // async suspendUser(@Body() userSuspend: User) {
  //   const { name } = userSuspend;

  //     return await this.suspendService.suspendUser(name);

  // }

  // @RolesDecorator(Roles.admin)
  // @UseGuards(AuthGuard, RolesGuard)
  // @Patch('/unsuspend')
  // async unsuspendUser(@Body() userSuspend: User) {
  //   const { name } = userSuspend;

  //     return await this.suspendService.unsuspendUser(name);

  // }
}
