import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entities/users/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'roles.enum';
import { RolesDecorator } from 'decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @HttpCode(200)
  @Get()
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(): Promise<User[]> {
    return this.UserService.getUsers();
  }

  @Get(':id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.UserService.getUserById(id);
  }
  @Post('email')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  getUserByEmail(@Body('email') email: string) {
    return this.UserService.getUserByEmail(email);
  }

  @Post('email/google')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  getUserByEmailFromGoogle(@Body('email') email: string) {
    return this.UserService.getUserByEmailFromGoogle(email);
  }

  @Post('username')
  getUserByUsername(@Body('username') username: string): Promise<User> {
    return this.UserService.getUserByUsername(username);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.user)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.UserService.deleteUser(id);
  }

  @Put('/changePassword/:id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.user)
  @UseGuards(AuthGuard, RolesGuard)
  changePassword(
    @Param('id', ParseUUIDPipe) user_id: string,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string,
  ): Promise<any> {
    
    return this.UserService.changePassword(user_id, password, newPassword);
  }

  @Put('/changeEmail/:id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.user)
  @UseGuards(AuthGuard, RolesGuard)
  changeEmail(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('email') email: string,
  ): Promise<any> {

    return this.UserService.changeEmail(id, email);
  }

  @Put('/changeUsername/:id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.user)
  @UseGuards(AuthGuard, RolesGuard)
  changeUsername(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('username') username: string,
  ): Promise<any> {
    
    return this.UserService.changeUsername(id, username);
  }

  @Put('/makeadmin/:id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.user, Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  makeAdmin(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.UserService.makeAdmin(id);
  }
}
