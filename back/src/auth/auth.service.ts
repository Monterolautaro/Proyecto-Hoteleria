import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}
    register() {
       this.authRepository.register();
    }
    login() {
     this.authRepository.login();
    }
}
