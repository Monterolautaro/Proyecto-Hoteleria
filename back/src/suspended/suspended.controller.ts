<<<<<<< HEAD
import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import { SuspendService } from './suspended.service';
import { User } from 'src/entities/user.entity';
=======
import { Controller, Body, UseGuards, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { SuspendService } from './suspended.service';
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
import { RolesDecorator } from 'decorators/roles.decorator';
import { Roles } from 'roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
<<<<<<< HEAD

=======
import { User } from 'src/entities/users/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Admin')
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly suspendService: SuspendService) {}

<<<<<<< HEAD
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('/suspend')
  async suspendUser(@Body() userSuspend: User) {
    const { name } = userSuspend;

      return await this.suspendService.suspendUser(name);

  }

  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('/unsuspend')
  async unsuspendUser(@Body() userSuspend: User) {
    const { name } = userSuspend;

      return await this.suspendService.unsuspendUser(name);

  }
}

=======
  @Put('/suspend/:id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  async suspendUser(@Param('id', ParseUUIDPipe) id: string) {

      return await this.suspendService.suspendUser(id);

  }

  @Put('/unsuspend/:id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  async unsuspendUser(@Param('id', ParseUUIDPipe) id: string) {

      return await this.suspendService.unsuspendUser(id);

  }
}
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
