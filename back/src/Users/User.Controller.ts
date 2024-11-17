import {
  BadRequestException,
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
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUserByEmailDto } from 'src/dto/getUserByEmail.dto';

@Controller('users')
// @UseGuards(AuthGuard)
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

  @Post('email')
  getUserByEmail(@Body('email') email: string) {
    return this.UserService.getUserByEmail(email);
  }

  @Post('username')
  getUserByUsername(@Body('username') username: string): Promise<User> {
    return this.UserService.getUserByUsername(username);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.UserService.deleteUser(id);
  }

  @Put('/changePassword/:id')
  changePassword(
    @Param('id', ParseUUIDPipe) user_id: string,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string,
  ): Promise<any> {
    return this.UserService.changePassword(user_id, password, newPassword);
  }

  @Put('/changeEmail/:id')
  changeEmail(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('email') email: string,
  ): Promise<any> {
    return this.UserService.changeEmail(id, email);
  }

  @Put(':id')
  changeUsername(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('username') username: string,
  ): Promise<any> {
    return this.UserService.changeUsername(id, username);
  }
}
