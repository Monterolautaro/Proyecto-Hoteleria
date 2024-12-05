<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { FilterRepository } from './filter.repository';
=======
import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterRepository } from './filter.repository';
import { FiltersDto } from 'src/dto/filter.dto';
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869

@Injectable()
export class FilterService {
  constructor(private readonly filterRepository: FilterRepository) {}

<<<<<<< HEAD
  async searchFilter(query: any) {
    try {
      return await this.filterRepository.searchFilter(query);
=======
  async searchFilter(query: FiltersDto, user_id: string) {
    try {
      return await this.filterRepository.searchFilter(query, user_id);
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
    } catch (error) {
      console.log(error, 'service');

      throw error;
    }
  }
<<<<<<< HEAD
}
=======

}
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
