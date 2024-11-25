import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { Roles } from 'roles.enum';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({
  path: '.env',
});


@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  
  constructor(private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
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

  async validateGoogleToken(token: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    
    const user = {
      email: payload.email,
      name: payload.name,
      role: [Roles.user],
    };

    // Generar token JWT interno
    return {
      accessToken: this.jwtService.sign(user),
      user,
    };
  }
}
