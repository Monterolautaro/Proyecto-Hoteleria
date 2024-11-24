import { Injectable } from '@nestjs/common';
import { FilterRepository } from './filter.repository';

@Injectable()
export class FilterService {
  constructor(private readonly filterRepository: FilterRepository) {}

  async searchFilter(query: any) {
    try {
      return await this.filterRepository.searchFilter(query);
    } catch (error) {
      console.log(error, 'service');

      throw error;
    }
  }
}