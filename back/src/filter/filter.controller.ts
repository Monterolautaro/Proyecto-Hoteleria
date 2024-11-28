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
      
      return await this.filterService.searchFilter(query);
    } catch (error) {
      throw new BadRequestException('Error loading hotels', error);
    }
  }

}
