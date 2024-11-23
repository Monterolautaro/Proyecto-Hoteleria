import { Injectable, NotFoundException } from '@nestjs/common';
import { connectionSource } from 'src/config/typeorm.config';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { RoomType } from 'src/entities/hotel/roomsType.entity';
import { Between, Like } from 'typeorm';

//const hotelsRepository = connectionSource.getRepository(Hotel);
const addressRepository = connectionSource.getRepository(Address);
const roomTypesRepository = connectionSource.getRepository(RoomType);
const amenitiesRepository = connectionSource.getRepository(Amenities);

@Injectable()
export class FilterRepository {
  async searchFilter(price: any, country: any, city: any, emtities: any) {
    try {
    // Price - RoomType
    const [min, max] = price/*.split(' - ').map(Number)*/;
    const prices = await roomTypesRepository.find({
    where: { price: Between(min, max) },
    });


    const prices_results = prices.map((price) => {
        return price.price;
    });

    // Amenitie - Amenities
    const amenities = await amenitiesRepository.find({
      where: [
          { pool: true },
          //{ gym: true },
          { spa: true },
          { restaurant: true },
          { bar: true },
      ].filter(amenity => amenity[emtities]),
    });

    const amenitie_results = amenities.map((amenitie) => {
        return amenitie.amenities_id;
    });

      // City - Address
      const cities = await addressRepository.find({
        where: { city: Like(`%${city}%`) },
      });

      const city_results = cities.map((address) => {
        return address.city;
      });

      // Country - Address
      const countries = await addressRepository.find({
        where: { country: Like(`%${country}%`) },
      });

      const country_results = countries.map((address) => {
        return address.country;
      });
      //
      const found_country = country_results.map((country) => {
        return country;
      });

      const partial_results = [city_results, found_country, prices_results, amenitie_results]
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