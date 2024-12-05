import { Controller, Get, Req } from '@nestjs/common';
import { PruebasService } from './pruebas.service';

@Controller('pruebas')
export class PruebasController {
  constructor(private readonly pruebasService: PruebasService) {}

  @Get()
  testingEndpoint(@Req() req: any) {
    if (!req.oidc || !req.oidc.isAuthenticated())
      return { error: 'User not authenticated' };

    return this.pruebasService.testingEndpoint(req);
  }
}
