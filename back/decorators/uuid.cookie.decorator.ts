import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export const SetUUIDCookie = createParamDecorator(
  (data: unknown = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const response = ctx.switchToHttp().getResponse();

    // verifico que la cookie tempId no exista
    if (!request.cookies['tempId']) {
      const tempId = uuidv4();  // Genero un uuid si no existe
      response.cookie('tempId', tempId, {
        httpOnly: true, // que solo este disponible en el backend
        maxAge: 24 * 60 * 60 * 1000, // Expira en 1 día
        secure: process.env.NODE_ENV === 'production', // Solo envía la cookie HTTPS en producción
      });
    }
    
    // agregamos el cookie en la request
    return request.cookies['tempId'];
  },
);