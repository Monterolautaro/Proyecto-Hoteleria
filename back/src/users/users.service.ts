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
 
      return this.userRepository.getUserByEmail(email);
 
  }

  getUserByEmailFromGoogle(email: string) {
  
      return this.userRepository.getUserByEmailFromGoogle(email);
  
  }

  getUserByUsername(username: string) {
      return this.userRepository.getUserByUsername(username);
 
  }

  deleteUser(id: string) {
   
      return this.userRepository.deleteUser(id);
  
  }

  changePassword(id: string, password: string, newPassword: string) {

      return this.userRepository.changePassword(id, password, newPassword);
  
  }

  changeEmail(id: string, email: string) {
      return this.userRepository.changeEmail(id, email);
  }

  changeUsername(id: string, username: string) {
  
      return this.userRepository.changeUsername(id, username);

  }

  makeAdmin(id: string) {
      return this.userRepository.makeAdmin(id);

}
}