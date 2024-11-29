import { Injectable } from '@nestjs/common';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async searchBar(query: any) {
    return await this.searchRepository.searchBar(query);
  }

  async searchBarResults(query: any, user_id: string) {
    return await this.searchRepository.searchBarResults(query, user_id);
  }
}
