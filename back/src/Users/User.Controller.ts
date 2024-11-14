import { Body, Controller, Delete, Get, HttpCode, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/DTO´s/User.dto';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @HttpCode(200)
  @Get()
  getUsers() {
    return this.UserService.getUsers();
  }
  @Get(":id")
  getUsersById(id: string) {
    return this.UserService.getUsersById(id);
  }
  @Delete(":id")
  deleteUser(id: string) {
    return this.UserService.deleteUser(id);
  }
  @Put(":id")
  changePassword(id: string, password: string) {
    return this.UserService.changePassword(id, password);
  }
  @Put(":id")
  changeEmail(id: string, email: string) {
    return this.UserService.changeEmail(id, email);
  }
  @Put(":id")
  changeName(id: string, name: string) {
    return this.UserService.changeName(id, name);
  }

  @Post()
  createUser(@Body() user : CreateUserDto) {
    return this.UserService.createUser(user);
  }
}
