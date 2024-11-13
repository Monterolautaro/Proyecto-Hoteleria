import { BadRequestException, Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  async addHotels() {
    try {
      return await this.hotelsRepository.addHotels();
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }
}
