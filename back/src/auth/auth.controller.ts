import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/User.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() userData: CreateUserDto): Promise<any> {
    return this.authService.signUp(userData);
  }

  @Post('signIn')
  async signIn(email: string, password: string): Promise<any> {
    return this.authService.signIn(email, password);
  }

  // signInByUsername
}
