import { BadRequestException, Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  async inserHotel(hotelData: any) {
    try {
      return await this.hotelsRepository.insertHotel(hotelData);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

  async getHotels() {
    try {
      return await this.hotelsRepository.getHotels();
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

  async getHotelById(id: string) {
    try {
      return await this.hotelsRepository.getHotelById(id);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }
}
