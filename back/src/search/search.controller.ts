import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('bar')
  async searchBar(@Query('query') query: any) {
      return await this.searchService.searchBar(query);
  }
<<<<<<< HEAD
=======

  @Post('bar-result')
  async searchBarResults(@Query('query') query: any) {
    
    return await this.searchService.searchBarResults(query);
    
  }
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d
}
