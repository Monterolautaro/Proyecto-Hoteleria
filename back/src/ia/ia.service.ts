import { Injectable } from '@nestjs/common';
import { IaRepository } from './ia.repository';

@Injectable()
export class IaService {
  constructor(private readonly iaRepository: IaRepository) {}

  async completion() {
    return await this.iaRepository.completion();
  }

  async text() {
    return await this.iaRepository.text();
  }
}
