import { Injectable } from '@nestjs/common';
import { FilterRepository } from './filter.repository';

@Injectable()
export class FilterService {
  constructor(private readonly filterRepository: FilterRepository) {}

  async searchBar(query: any) {
    try {
      return await this.filterRepository.searchBar(query);
    } catch (error) {
      console.log(error, 'service');

      throw error;
    }
  }
}