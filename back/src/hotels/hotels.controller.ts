import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post('/batch')
  async insertHotel(@Body() hotelData: any) {
    try {
      return this.hotelsService.inserHotel(hotelData);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

  @Get('/')
  async getHotels() {
    try {
     return await this.hotelsService.getHotels();
      ;
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

  @Get('/:id')
  async getHotelById(@Body() id: string) {
    try {
      return await this.hotelsService.getHotelById(id);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }
}
