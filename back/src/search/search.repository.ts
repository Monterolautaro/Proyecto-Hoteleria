import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SearchRepository {
  constructor(
    @InjectRepository(Hotel) private hotelsRepository: Repository<Hotel>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ){}
  async searchBar(query: any) {
    try {
      const names = await this.hotelsRepository.find({
        where: { name: Like(`%${query}%`) },
      });

      const name_results = names.map((hotel) => {
        return hotel.name;
      });

      // City - Address
      const cities = await this.addressRepository.find({
        where: { city: Like(`%${query}%`) },
      });

      const city_results = cities.map((address) => {
        return address.city;
      });

      // Country - Address
      const countries = await this.addressRepository.find({
        where: { country: Like(`%${query}%`) },
      });

      const country_results = countries.map((address) => {
        return address.country;
      });
      //
      const found_country = country_results.map((country) => {
        return country;
      });

      const partial_results = [name_results, city_results, found_country]
        .filter((item) => item !== undefined && item !== null)
        .flat();

      const results = [...new Set(partial_results)];

      if (results.length <= 0) {
        return [];
      }

      return results;
    } catch (error) {
      console.log(error);

      throw new NotFoundException('Error loading hotels', error);
    }
  }
} /* cierre */
