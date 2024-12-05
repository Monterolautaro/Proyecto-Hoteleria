import { Module } from '@nestjs/common';
import { PruebasController } from './pruebas.controller';
import { PruebasService } from './pruebas.service';

@Module({
  imports: [],
  controllers: [PruebasController],
  providers: [PruebasService],
})
export class PruebasModule {}
