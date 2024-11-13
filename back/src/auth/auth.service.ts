import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  signUp(userData) {
    const { name, lastname, birthday, username, email, password } = userData;
    this.authRepository.signUp(
      name,
      lastname,
      birthday,
      username,
      email,
      password,
    );
  }
  signIn() {
    this.authRepository.signIn();
  }
}
