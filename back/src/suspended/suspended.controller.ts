import { Controller, Body, UseGuards, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { SuspendService } from './suspended.service';
import { RolesDecorator } from 'decorators/roles.decorator';
import { Roles } from 'roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/entities/users/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Admin')
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly suspendService: SuspendService) {}

  @Put('/suspend')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  async suspendUser(@Param('user_id', ParseUUIDPipe) user_id: string) {

      return await this.suspendService.suspendUser(user_id);

  }

  @Put('/unsuspend')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  async unsuspendUser(@Param('user_id', ParseUUIDPipe) user_id: string) {

      return await this.suspendService.unsuspendUser(user_id);

  }
}
