import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'roles.enum';
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      
      const token = request.headers['authorization'].split(' ')[1] ?? '';

      if (!token) throw new ForbiddenException('No token provided');
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      request.iat = new Date(payload.iat * 1000);
      request.exp = new Date(payload.exp * 1000);

      request.user = {
        id: payload.id,
        email: payload.email,
        verified: payload.verified,
        roles: Array.isArray(payload.role) ? payload.role : [payload.role],
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Access denied, check either your token or your credentials',
      );
    }
  }
}
