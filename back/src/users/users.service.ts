import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers() {
    try {
      return this.userRepository.getUsers();
    } catch (error) {
      throw new BadRequestException('Something got wrong getting users', error);
    }
  }
  getUserById(id: string) {
    try {
      return this.userRepository.getUserById(id);
    } catch (error) {
      throw new BadRequestException('Something got wrong getting user', error);
    }
  }

  getUserByEmail(email: string) {
    try {
      console.log('Service:', email);
      return this.userRepository.getUserByEmail(email);
    } catch (error) {
      throw new BadRequestException('Something got wrong getting user', error);
    }
  }

  getUserByUsername(username: string) {
    try {
      return this.userRepository.getUserByUsername(username);
    } catch (error) {
      throw new BadRequestException('Something got wrong getting user', error);
    }
  }

  deleteUser(id: string) {
    try {
      return this.userRepository.deleteUser(id);
    } catch (error) {
      throw new BadRequestException('Something got wrong deleting user', error);
    }
  }

  changePassword(id: string, password: string, newPassword: string) {
    try {
      return this.userRepository.changePassword(id, password, newPassword);
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong changing password',
        error,
      );
    }
  }

  changeEmail(id: string, email: string) {
    try {
      return this.userRepository.changeEmail(id, email);
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong changing email',
        error,
      );
    }
  }

  changeUsername(id: string, username: string) {
    try {
      return this.userRepository.changeUsername(id, username);
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong changing username',
        error,
      );
    }
  }

  makeAdmin(id: string) {
    try {
      return this.userRepository.makeAdmin(id);
    } catch (error) {
      throw new BadRequestException('Something got wrong making admin', error);
    }
  }
}
