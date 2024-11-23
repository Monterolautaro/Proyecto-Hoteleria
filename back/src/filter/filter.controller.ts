import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Query,
  } from '@nestjs/common';
import { FilterService } from './filter.service';
  
  @Controller('filter')
  export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Post('hotel')
    async searchBar(@Query('price') price: any, @Query('country') country: any, @Query('city') city: any, @Query('amenities') amenities: any) {
      try {
        return await this.filterService.searchFilter(price, country, city, amenities);
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