import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() userData: CreateUserDto): Promise<any> {
    return this.authService.signUp(userData);
  }

  @Post('signIn')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    return this.authService.signIn(email, password);
  }

  // signInByUsername
}
