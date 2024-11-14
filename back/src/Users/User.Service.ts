import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/DTO´s/User.dto';

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

  changeName(id: string, name: string) {
    return this.userRepository.changeName(id, name);
  }


  createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }
}
