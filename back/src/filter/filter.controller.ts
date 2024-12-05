import {
<<<<<<< HEAD
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
=======
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
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
