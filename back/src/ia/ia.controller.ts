import { BadRequestException, Controller, Get } from '@nestjs/common';
import { IaService } from './ia.service';
import { BadRequestError } from 'cohere-ai/api';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('hotels')
  async completion() {
    try {
      return await this.iaService.completion();
    } catch (error) {
      throw new BadRequestException('Al cargar los hoteles:', error);
    }
  }

  @Get('text')
  async text() {
    try {
      return await this.iaService.text();
    } catch (error) {
      throw new BadRequestException('Al cargar el texto:', error);
    }
  }
}
