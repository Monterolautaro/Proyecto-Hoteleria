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
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @HttpCode(200)
  @Get()
  getUsers() {
    try {
      return this.UserService.getUsers();
    } catch (error) {
      throw new BadRequestException('Something got wrong getting users', error.message)
    }
  }
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
      return this.UserService.getUserById(id);
  }

  @Get(':id')
  getUserByEmail(@Param('id', ParseUUIDPipe) id: string) {
    return this.UserService.getUserByEmail(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
      return this.UserService.deleteUser(id);
  }

  @Put(':id')
  changePassword(@Param('id', ParseUUIDPipe) id: string, password: string) {
    return this.UserService.changePassword(id, password);
  }

  @Put(':id')
  changeEmail(@Param('id', ParseUUIDPipe) id: string, email: string) {
    return this.UserService.changeEmail(id, email);
  }

  @Put(':id')
  changeUsername(@Param('id', ParseUUIDPipe) id: string, username: string) {
    return this.UserService.changeUsername(id, username);
  }
}
