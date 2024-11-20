import { SetMetadata } from '@nestjs/common';
import { Roles } from 'roles.enum';

export const ROLES_KEY = 'roles';

export const RolesDecorator = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
