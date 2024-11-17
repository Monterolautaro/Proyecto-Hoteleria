import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @HttpCode(200)
  @Get()
  getUsers(): Promise<User[]> {
      return this.UserService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
      return this.UserService.getUserById(id);
  }

  @Get('email')
  getUserByEmail(@Body() email): Promise<User> {
    return this.UserService.getUserByEmail(email);
  }

  @Get('username')
  getUserByUsername(@Body() username): Promise<User> {
    return this.UserService.getUserByUsername(username);
  }
  ß
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
      return this.UserService.deleteUser(id);
  }

  @Put(':id')
  changePassword(@Param('id', ParseUUIDPipe) id: string, @Body() password: string): Promise<any> {
    return this.UserService.changePassword(id, password);
  }

  @Put(':id')
  changeEmail(@Param('id', ParseUUIDPipe) id: string, @Body() email: string): Promise<any> {
    return this.UserService.changeEmail(id, email);
  }

  @Put(':id')
  changeUsername(@Param('id', ParseUUIDPipe) id: string, @Body() username: string): Promise<any> {
    return this.UserService.changeUsername(id, username);
  }
}
