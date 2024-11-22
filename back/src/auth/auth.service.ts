import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async signUp(userData: CreateUserDto): Promise<any> {
    return this.authRepository.signUp(userData);
  }

  async signInHotelOwner(userData) {
    return this.authRepository.signUpHotelOwner(userData);
  }

  async signIn(email: string, password: string) {
    return this.authRepository.signIn(email, password);
  }

  async verifyAccountCode(user_id: string, code: string) {
    return this.authRepository.verifyAccountCode(user_id, code);
  }
}
