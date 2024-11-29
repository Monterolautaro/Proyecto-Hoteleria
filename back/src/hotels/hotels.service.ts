import { BadRequestException, Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  async addIsDeletedColumn(id: string){
    try{
      return await this.hotelsRepository.updateIsDeletedById(id);
    } catch(error){
      throw new BadRequestException('Something got wrong getting users', error);
    }
  }

  async updateIsActiveById(id: string){
    try{
      return await this.hotelsRepository.updateIsActiveById(id);
    } catch(error){
      throw new BadRequestException('Something got wrong getting users', error);
    }
  }

  async putHotels(id: string){
    try{
      return await this.hotelsRepository.putHotels(id);
    } catch(error){
      throw new BadRequestException('Something got wrong getting users', error);
    }
  }

  async inserHotel(hotelData: any) {
    try {
      return await this.hotelsRepository.insertHotel(hotelData);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
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
