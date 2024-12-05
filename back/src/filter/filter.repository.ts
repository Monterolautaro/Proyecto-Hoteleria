<<<<<<< HEAD
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
  async searchFilter(query: any) {
    try {
    // Price - RoomType
    const [min, max] = query.split('-').map(Number);
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
          { gym: true },
          { spa: true },
          { restaurant: true },
          { bar: true },
      ].filter(amenity => amenity[query]),
    });

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
=======
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { FiltersDto } from 'src/dto/filter.dto';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { RedisService } from 'src/redis/redis.service';
import { Repository } from 'typeorm';

@Injectable()
export class FilterRepository {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Hotel)
    private readonly hotelsRepository: Repository<Hotel>,
  ) {}
  async searchFilter(query: FiltersDto, user_id: string): Promise<Hotel[]> {
    
    const { price, amenities, city, country } = query;
    
    try {
    
    const key = `hotels:${user_id}`;
    const hotelArray = await this.redisService.hGetHotels(key);
    
      if (!hotelArray) return [];

      let filteredHotels = hotelArray;

      // filtro por precio
      if (price) {
        const [minPrice, maxPrice] = price.split(',').map(Number);
        filteredHotels = filteredHotels.filter((hotel) =>
          hotel.room.some((room) =>
            room.room_type.price >= minPrice && room.room_type.price <= maxPrice
          )
        );
      }

      // filtro por country
      if (country) {
        filteredHotels = filteredHotels.filter(
          (hotel) => hotel.address.country === country,
        );
      }

      // filtro por city
      if (city) {
        filteredHotels = filteredHotels.filter(
          (hotel) => hotel.address.city === city,
        );
      }

      

      // filtro por amenities
      if (amenities) {
        const amenitiesArray = amenities
          .trim()
          .split(',')
          .map((name) => name.trim());
    
        filteredHotels = filteredHotels.filter((hotel) =>
          amenitiesArray.every((amenity) => hotel.amenities[amenity] === true),
        );
      }
      
      
      return filteredHotels;
    } catch (error) {
      console.log({ message: 'Error en el filtrado', error });
      throw new NotFoundException('Error loading hotels', error);
    }
  }
} /* cierre */
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
