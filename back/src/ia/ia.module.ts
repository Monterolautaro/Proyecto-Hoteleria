import { Module } from '@nestjs/common';
import { IaController } from './ia.controller';
import { IaService } from './ia.service';
import { IaRepository } from './ia.repository';

@Module({
  imports: [],
  controllers: [IaController],
  providers: [IaService, IaRepository],
})
export class IaModule {}
