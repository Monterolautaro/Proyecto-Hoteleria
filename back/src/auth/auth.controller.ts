import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() userData: any) {
    return this.authService.signUp(userData);
  }

  @Post('login')
  async signIn(email: string, password: string) {
    return this.authService.signIn(email, password);
  }
}
