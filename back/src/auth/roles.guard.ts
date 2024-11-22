import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'roles.enum';
import { ROLES_KEY } from 'decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //accedo a la metadata para verificar cuales roles son requeridos
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //accedo a la request para obtener el user
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    //* Autorización
    const hasRole = () =>
      requiredRoles.some((role) => user?.roles?.includes(role));

    const valid = user && user.roles && hasRole();

    // si el usuario no tiene los roles permitidos, "valid" es false entonces se lanza un error 403
    if (!valid) {
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    }

    return true;
  }
}
