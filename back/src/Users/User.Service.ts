import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/User.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.getUsers();
  }
  getUsersById(id: string) {
    return this.userRepository.getUsersById(id);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }

  changePassword(id: string, password: string) {
    return this.userRepository.changePassword(id, password);
  }

  changeEmail(id: string, email: string) {
    return this.userRepository.changeEmail(id, email);
  }

  changeUsername(id: string, username: string) {
    return this.userRepository.changeUsername(id, username);
  }

  createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }
}
