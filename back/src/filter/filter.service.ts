import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterRepository } from './filter.repository';
import { FiltersDto } from 'src/dto/filter.dto';

@Injectable()
export class FilterService {
  constructor(private readonly filterRepository: FilterRepository) {}

  async searchFilter(query: FiltersDto, user_id: string) {
    try {
      return await this.filterRepository.searchFilter(query, user_id);
    } catch (error) {
      console.log(error, 'service');

      throw error;
    }
  }

}
