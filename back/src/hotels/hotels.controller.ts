import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
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

  //**********************************SERVICIO DE ADMIN*****************************************************
  //*MODIFIQUE LA ENTIDAD DE USUARIO LE AGREGUE ISDELETED 

  @Post('addDelete/:id')
  addIsDeletedColumn(@Param('id', ParseUUIDPipe) id: string) {
    try{
      //return await this.hotelsService.addIsDeletedColumn(id);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

  @Post('addActive/:id')
  updateIsActiveById(@Param('id', ParseUUIDPipe) id: string) {
    try{
      //return await this.hotelsService.updateIsActiveById(id);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

  @Put('/putHotel/:id')
  async putHotels(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.hotelsService.putHotels(id);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }
}
