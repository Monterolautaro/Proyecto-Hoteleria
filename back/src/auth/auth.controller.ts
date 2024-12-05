import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { GoogleAuthDto } from 'src/dto/google.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() userData: CreateUserDto): Promise<any> {
    
    return this.authService.signUp(userData);
  }

  @Post('signUp/hotel-owner')
  async signInHotelOwner(@Body() userData: string): Promise<any> {
    return this.authService.signInHotelOwner(userData);
  }

  @Post('verify-account/:id')
  async verifyAccountCode(
    @Param('id', ParseUUIDPipe) user_id: string,
    @Body('code') code: string,
  ): Promise<any> {
    return this.authService.verifyAccountCode(user_id, code);
  }

  @Post('signIn')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> { 
    return this.authService.signIn(email, password);
  }

  @Post('validate-google-token')
  async validateGoogleToken(@Body() { token }: GoogleAuthDto) {
    return this.authService.validateGoogleToken(token);
  }

  // signInByUsername
}
