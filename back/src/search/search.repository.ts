import { Injectable, NotFoundException } from '@nestjs/common';
import { connectionSource } from 'src/config/typeorm';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Like } from 'typeorm';

const hotelsRepository = connectionSource.getRepository(Hotel);
const addressRepository = connectionSource.getRepository(Address);

@Injectable()
export class SearchRepository {
  async searchBar(query: any) {
    try {

      const names = await hotelsRepository.find({
        where: { name: Like(`%${query}%`) },
      });

      const name_results = names.map((hotel) => {
        return hotel.name
      })
      
      // City - Address
      const cities = await addressRepository.find({
        where: { city: Like(`%${query}%`) },
      });

      const city_results = cities.map((address) => {
        return address.city
      })

      // Country - Address
      const countries = await addressRepository.find({
        where: { country: Like(`%${query}%`) },
      });

      const country_results = countries.map((address) => {
        return address.country
      })
      //
      const found_country = country_results.map((country) => {
          return country
      })
      console.log(found_country);
      

      const results = [name_results, city_results, found_country].filter((item) => item !== undefined || item !== null).flat();

      if(results.length <= 0) {
        return []
      }

      return results

    } catch (error) {
        console.log(error);
        
      throw new NotFoundException('Error loading hotels', error);
    }
  }
}
