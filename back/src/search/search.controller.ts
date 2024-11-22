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
    try {
      return await this.searchService.searchBar(query);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

  @Post('bar-result')
  async searchBarResult(@Query('query') query: any) {
    return await this.searchService.searchBar;
  }
}
