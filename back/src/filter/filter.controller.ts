import {
    BadRequestException,
    Controller,
    Post,
    Query,
  } from '@nestjs/common';
import { FilterService } from './filter.service';
  
  @Controller('filter')
  export class FilterController {
    constructor(private readonly filterService: FilterService) {}
  
    @Post('hotels')
    async searchBar(@Query('query') query: any) {
        return await this.filterService.searchFilter(query);
    }

    
  }