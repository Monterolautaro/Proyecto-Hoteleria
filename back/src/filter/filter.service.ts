import { Injectable } from '@nestjs/common';
import { FilterRepository } from './filter.repository';

@Injectable()
export class FilterService {
  constructor(private readonly filterRepository: FilterRepository) {}

  async searchFilter(query: any) {
    
      return await this.filterRepository.searchFilter(query);
   
  }
}