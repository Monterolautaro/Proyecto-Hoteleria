import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @HttpCode(200)
  @Get()
  getUsers() {
    return this.UserService.getUsers();
  }

  getUsersById(id: string) {
    return this.UserService.getUsersById(id);
  }

  deleteUser(id: string) {
    return this.UserService.deleteUser(id);
  }

  changePassword(id: string, password: string) {
    return this.UserService.changePassword(id, password);
  }

  changeEmail(id: string, email: string) {
    return this.UserService.changeEmail(id, email);
  }

  changeName(id: string, name: string) {
    return this.UserService.changeName(id, name);
  }
}
