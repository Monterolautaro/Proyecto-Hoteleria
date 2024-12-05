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

  async deleteHotel(id: string) {
   
    return await this.hotelsRepository.deleteHotel(id);

}

  async getHotels(page, limit) {
    try {
      return await this.hotelsRepository.getHotels(page, limit);
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

  async createHotelByOwner(hotelData: any, owner_id: string) {
    return await this.hotelsRepository.createHotelByOwner(hotelData, owner_id);
  }
}
