import { Injectable } from '@nestjs/common';

@Injectable()
export class PruebasService {
  testingEndpoint(req) {
    return req.oidc.user;
  }
}
