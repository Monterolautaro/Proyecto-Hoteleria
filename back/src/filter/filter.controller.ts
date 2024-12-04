import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { FilterService } from './filter.service';
import { FiltersDto } from 'src/dto/filter.dto';
import { SetUUIDCookie } from 'decorators/uuid.cookie.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Filter')
@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('hotel')
  async searchBar(@Query() query: FiltersDto, @SetUUIDCookie() id: string) {
    
      return await this.filterService.searchFilter(query, id);
  }
}