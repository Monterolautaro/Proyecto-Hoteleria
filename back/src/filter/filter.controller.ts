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
    async searchBar(@Query('query') query: any) {
      try {
        return await this.filterService.searchFilter(query);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }
  }