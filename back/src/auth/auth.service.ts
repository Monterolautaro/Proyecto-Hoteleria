import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from 'src/dto/User.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async signUp(userData: CreateUserDto): Promise<any> {
    this.authRepository.signUp(userData);
  }

  async signIn(email: string, password: string) {
    this.authRepository.signIn(email, password);
  }
}
