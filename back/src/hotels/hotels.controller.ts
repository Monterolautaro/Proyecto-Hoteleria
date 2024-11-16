import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
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
  async getHotels(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      return await this.hotelsService.getHotels(page, limit);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

  @Get('/:id')
  async getHotelById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.hotelsService.getHotelById(id);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }
}
