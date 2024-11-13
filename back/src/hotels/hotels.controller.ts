import { BadRequestException, Controller, Get } from '@nestjs/common';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get('hotelSeeder')
  async addHotels() {
    try {
      return this.hotelsService.addHotels();
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }
}
