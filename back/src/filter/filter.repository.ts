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
  async searchBar(query: any) {
    try {
    // Price - RoomType
    const prices = await roomTypesRepository.find({
        where: {price: Between(Number(`%${query}%`), Number(`%${query}%`))},
    })

    const prices_results = prices.map((price) => {
        return price.price;
    });

    // Amenitie - Amenities
    const stringToBoolean = (value: string): boolean => value.toLowerCase() === "true";

    const amenities = await amenitiesRepository.find({
        where: {pool: stringToBoolean(`%${query}%`) ?? false,
            gym: stringToBoolean(`%${query}%`) ?? false,
            spa: stringToBoolean(`%${query}%`) ?? false,
            restaurant: stringToBoolean(`%${query}%`) ?? false,
            bar: stringToBoolean(`%${query}%`) ?? false,},
    });

    /*const amenities = await amenitiesRepository.find({
        where: { amenities_id: Like(`%${query}%`) },
    });*/

    const amenitie_results = amenities.map((amenitie) => {
        return amenitie.amenities_id;
    });

      // City - Address
      const cities = await addressRepository.find({
        where: { city: Like(`%${query}%`) },
      });

      const city_results = cities.map((address) => {
        return address.city;
      });

      // Country - Address
      const countries = await addressRepository.find({
        where: { country: Like(`%${query}%`) },
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