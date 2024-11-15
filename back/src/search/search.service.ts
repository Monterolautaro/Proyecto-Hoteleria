import { Injectable } from '@nestjs/common';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async searchBar(query: any) {
    try {
      return await this.searchRepository.searchBar(query);
    } catch (error) {
      console.log(error, 'service');

      throw error;
    }
  }
}
