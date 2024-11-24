import {
    BadRequestException,
    Controller,
    Get,
    Post,
    Query,
  } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FiltersDto } from 'src/dto/filter.dto';
  
  @Controller('filter')
  export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Get('hotel')
    async searchBar(@Query() query: FiltersDto) {
      try {
        console.log(query);
        
        
        return await this.filterService.searchFilter(query);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }
  
    /*@Post('hotel/price')
    async searchBarPrice(@Query('price') price: any) {
      try {
        return await this.filterService.searchFilter(price);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }

    @Post('hotel/country')
    async searchBarCountry(@Query('country') country: any) {
      try {
        return await this.filterService.searchCountry(country);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }

    @Post('hotel/city')
    async searchBarCity(@Query('city') query: any) {
      try {
        return await this.filterService.searchCity(query);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }

    @Post('hotel/emtities')
    async searchBarEmtities(@Query('emtities') query: any) {
      try {
        return await this.filterService.searchEmtities(query);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }*/
  }