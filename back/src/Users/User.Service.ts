import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/User.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers() {
    try {
      return this.userRepository.getUsers();
    } catch (error) {
      throw new BadRequestException('Something got wrong getting users', error.message)
    }
  }
  getUserById(id: string) {
    try {
      return this.userRepository.getUserById(id);
    } catch (error) {
      throw new BadRequestException('Something got wrong getting user', error.message)
    }
  }

  getUserByEmail(email: string) {
    try {
      return this.userRepository.getUserByEmail(email);
    } catch (error) {
      throw new BadRequestException('Something got wrong getting user', error.message)
    }
  }

  deleteUser(id: string) {
    try {
      return this.userRepository.deleteUser(id);
    } catch (error) {
      throw new BadRequestException('Something got wrong deleting user', error.message)
    }
  }

  changePassword(id: string, password: string) {
    try {
      return this.userRepository.changePassword(id, password);
    } catch (error) {
      throw new BadRequestException('Something got wrong changing password', error.message)      
    }
  }

  changeEmail(id: string, email: string) {
    try {
      return this.userRepository.changeEmail(id, email);
    } catch (error) {
      throw new BadRequestException('Something got wrong changing email', error.message)
    }
  }

  changeUsername(id: string, username: string) {
    try {
      return this.userRepository.changeUsername(id, username);
    } catch (error) {
      throw new BadRequestException('Something got wrong changing username', error.message)
    }
  }

}
