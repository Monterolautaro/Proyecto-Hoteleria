/* eslint-disable prettier/prettier */
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { auth } from 'express-openid-connect';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     const config = {
//       authRequired: false, // Opcional, permite acceso a rutas no autenticadas
//       auth0Logout: true,
//       secret: process.env.AUTH0_SECRET,
//       baseURL: process.env.BASE_URL || 'http://localhost:3000',
//       clientID: process.env.AUTH0_CLIENT_ID || 'TdvDtEFnGoSs7JH2rnK4lOKGVxY4IKCc',
//       issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || 'https://dev-l47mfknz35xz0s10.us.auth0.com',
//     };

//     // Agregar el middleware de Auth0
//     auth(config)(req, res, next);
//   }
// }
