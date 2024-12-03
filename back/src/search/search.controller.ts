import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SetUUIDCookie } from 'decorators/uuid.cookie.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('bar')
  async searchBar(@Query('query') query: any) {
    return await this.searchService.searchBar(query);
  }

  @Post('bar-result')
  async searchBarResults(@Query('query') query: any, @SetUUIDCookie() id: string) {
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }
    return await this.searchService.searchBarResults(query, id);
  }
}
