import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterRepository } from './filter.repository';

@Injectable()
export class FilterService {
  constructor(private readonly filterRepository: FilterRepository) {}

  async searchFilter(price: any, country: any, city: any, emtities: any) {
    try {
      return await this.filterRepository.searchFilter(price, country, city, emtities);
    } catch (error) {
      console.log(error, 'service');

      throw error;
    }
  }

    /*async searchCountry(query: any) {
      try {
        return await this.filterRepository.searchFilter(query);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }

    async searchCity(query: any) {
      try {
        return await this.filterRepository.searchFilter(query);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }

    async searchEmtities(query: any) {
      try {
        return await this.filterRepository.searchFilter(query);
      } catch (error) {
        throw new BadRequestException('Error loading hotels', error);
      }
    }*/
}