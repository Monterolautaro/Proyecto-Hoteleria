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

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @HttpCode(200)
  @Get()
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(): Promise<User[]> {
    return this.UserService.getUsers();
  }

  @Get(':id')
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.UserService.getUserById(id);
  }

  @Post('email')
  getUserByEmail(@Body('email') email: string) {
    return this.UserService.getUserByEmail(email);
  }

  @Post('username')
  getUserByUsername(@Body('username') username: string): Promise<User> {
    return this.UserService.getUserByUsername(username);
  }

  @Delete(':id')
  @RolesDecorator(Roles.admin, Roles.user)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.UserService.deleteUser(id);
  }

  @Put('/changePassword/:id')
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
  @RolesDecorator(Roles.admin, Roles.user)
  @UseGuards(AuthGuard, RolesGuard)
  changeEmail(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('email') email: string,
  ): Promise<any> {
    return this.UserService.changeEmail(id, email);
  }

  @Put('/changeUsername/:id')
  @RolesDecorator(Roles.admin, Roles.user)
  @UseGuards(AuthGuard, RolesGuard)
  changeUsername(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('username') username: string,
  ): Promise<any> {
    return this.UserService.changeUsername(id, username);
  }

  @Put('/makeadmin/:id')
  @RolesDecorator(Roles.user, Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  makeAdmin(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.UserService.makeAdmin(id);
  }

}
