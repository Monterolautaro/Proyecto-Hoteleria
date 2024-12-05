import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { Roles } from 'roles.enum';
import { config as dotenvConfig } from 'dotenv';
import { UserRepository } from 'src/users/users.repository';

dotenvConfig({
  path: '.env',
});

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
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

    if (!payload) {
      throw new Error('Invalid token payload');
    }

    try {
      // Verifico que el email de google haya sido verificado por google
      if (!payload.email_verified)
        throw new UnauthorizedException(
          'Please verify your email with Google before continue',
        );

        const foundUser = await this.userRepository.getUserByEmail(payload.email);
        
        // si el usuario existe pero está suspendido, lo logeo como suspended user
        if(foundUser && payload.email === foundUser.credential.email && foundUser.isSuspend === true) {
          const user = {
            email: payload.email,
            name: payload.name,
            role: [Roles.suspended],
          };
          
          return {
            accessToken: this.jwtService.sign(user),
            user,
            message: 'User logged in successfully via Google Authentication as a suspended user',
            status: 'logged in as suspended user'
          }
        }
        
        // Si el usuario existe en la DB, lo logueo
      if (foundUser && payload.email === foundUser.credential.email) {
        const user = {
          email: payload.email,
          name: payload.name,
          role: [Roles.user],
        };

        // Genero un JWT interno con los datos del usuario y lo devuelvo al front
        
        return {
          accessToken: this.jwtService.sign(user),
          user,
          message: 'User logged in successfully via Google Authentication',
          status: 'logged in',
        };
      }

      // Si no existe, lo registro y logueo
      const userData = {
        email: payload.email,
        name: payload.name,
        lastname: payload.family_name,
        username: payload.given_name,
      };

      await this.authRepository.signUpGoogleUser(userData);
      
      const user = {
        email: payload.email,
        name: payload.name,
        role: [Roles.user],
      };

      // Genero un JWT interno con los datos del usuario
      return {
        accessToken: this.jwtService.sign(user),
        user,
        message: 'User registered successfully via Google Authentication',
        status: 'registered',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new BadRequestException(
        'Error logging in or signing up by Google Authentication',
        error,
      );
    }
  }
}
