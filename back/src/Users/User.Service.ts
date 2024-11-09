import { Injectable } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { UserEntity } from './User.Entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.getUsers();
  }
  getUsersById(id: string) {
    return this.userRepository.getUsersById(id);
  }
  createUser(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    return this.userRepository.createUser(user);
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
}
