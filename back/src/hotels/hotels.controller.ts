import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Hotels')
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

  @Post('/create/:id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.hotel_owner, Roles.admin)
  @UseGuards(AuthGuard, RolesGuard)
  async createHotelByOwner(
    @Param('id', ParseUUIDPipe) user_id: string,
    @Body() hotelData: any,
  ) {
    return await this.hotelsService.createHotelByOwner(user_id, hotelData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.hotelsService.deleteHotel(id);
  }
}
