import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesDecorator } from 'decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'roles.enum';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post('/batch')
  @RolesDecorator(Roles.admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
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

  @Post('/create/:id')
  @RolesDecorator(Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  async createHotelByOwner(
    @Param('id', ParseUUIDPipe) user_id: string,
    @Body() hotelData: any,
  ) {
    return await this.hotelsService.createHotelByOwner(user_id, hotelData);
  }
}
