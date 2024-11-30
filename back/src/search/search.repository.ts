/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { merge } from 'rxjs';
import { SearchHotelDto } from 'src/dto/search-hotel.dto';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { RedisService } from 'src/redis/redis.service';
import { Repository } from 'typeorm';

@Injectable()
export class SearchRepository {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Hotel) private hotelsRepository: Repository<Hotel>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) { }
  async searchBar(query: any) {
    try {
      // Hotel names
      const names = await this.hotelsRepository
        .createQueryBuilder('hotel')
        .where('unaccent(hotel.name) ILike unaccent(:query)', {
          query: `%${query}%`,
        })
        .distinct(true)
        .getMany();

      const name_results = names.map((hotel) => {
        return hotel.name;
      });

      // City - Address
      const cities = await this.addressRepository
        .createQueryBuilder('address')
        .where('unaccent(address.city) ILike unaccent(:query)', {
          query: `%${query}%`,
        })
        .distinct(true)
        .getMany();

      const city_results = cities.map((address) => {
        return address.city;
      });

      // Country - Address
      const countries = await this.addressRepository
        .createQueryBuilder('address')
        .where('unaccent(address.country) ILike unaccent(:query)', {
          query: `%${query}%`,
        })
        .distinct(true)
        .getMany();

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

  async searchBarResults(query: any, user_id: string) {

    try {
      
      // Busco hoteles, o ciudades, o paises segun el query
      const foundHotel = await this.hotelsRepository
        .createQueryBuilder('hotel')
        .leftJoinAndSelect('hotel.address', 'address')
        .leftJoinAndSelect('hotel.amenities', 'amenities')
        .leftJoinAndSelect('hotel.room', 'room')
        .leftJoinAndSelect('room.room_type', 'room_type')
        .leftJoinAndSelect('hotel.availability', 'availability')
        .leftJoinAndSelect('hotel.details', 'details')
        .where('unaccent(hotel.name) ILike unaccent(:query)', {
          query: `%${query}%`,
        })
        .orWhere('unaccent(address.city) ILike unaccent(:query)', {
          query: `%${query}%`,
        })
        .orWhere('unaccent(address.country) ILike unaccent(:query)', {
          query: `%${query}%`,
        })
        .distinctOn(['hotel.name', 'address.city', 'address.country'])
        .getMany();

      if (foundHotel.length >= 1) {
        // extraigo el elemento mas similar a lo que se paso por query
        const hotelId = foundHotel[0].hotel_id;

        // busco el hotel exacto con el id del elemento que extraje
        const hotel: SearchHotelDto = await this.hotelsRepository
          .createQueryBuilder('hotel')
          .where('hotel.hotel_id = :hotelId', { hotelId })
          .leftJoinAndSelect('hotel.address', 'address')
          .leftJoinAndSelect('hotel.amenities', 'amenities')
          .leftJoinAndSelect('hotel.room', 'room')
          .leftJoinAndSelect('room.room_type', 'room_type')
          .leftJoinAndSelect('hotel.availability', 'availability')
          .leftJoinAndSelect('hotel.details', 'details')
          .getOne();

        // Si es que se busca por ciudad o country, no se puede hacer split
        const splitHotels = query.split(' ');
        if (splitHotels.length <= 1) {
          const otherHotels: SearchHotelDto[] = await this.hotelsRepository
            .createQueryBuilder('hotel')
            .leftJoinAndSelect('hotel.address', 'address')
            .leftJoinAndSelect('hotel.amenities', 'amenities')
            .leftJoinAndSelect('hotel.room', 'room')
            .leftJoinAndSelect('room.room_type', 'room_type')
            .leftJoinAndSelect('hotel.availability', 'availability')
            .leftJoinAndSelect('hotel.details', 'details')
            .where('unaccent(address.city) ILike unaccent(:query)', {
              query: `%${query}%`
            })
            .orWhere('unaccent(address.country) ILike unaccent(:query)', {
              query: `%${query}%`
            })
            .orderBy('hotel.name', 'ASC')
            .orderBy('address.city', 'ASC')
            .orderBy('address.country', 'ASC')
            .distinctOn(['hotel.name', 'address.city', 'address.country'])
            .getMany();

          return [hotel, ...otherHotels];
        }

        const filteredSplitHotels = splitHotels.filter(
          (item) => item.toLowerCase() !== 'hotel'
        );

        // Ahora tengo que buscar hoteles pasando como parametro el filtered splitHotels
        const otherHotels: SearchHotelDto[] = await this.fetchOtherHotels(filteredSplitHotels)

        const finalHotels = otherHotels.filter((item) => item.hotel_id !== hotel.hotel_id)

        const cacheHotels = [hotel, ...finalHotels];
        // asigno una key para el caché
        const key = `hotels:${user_id}`;

        // si ya había caché, lo borro
        await this.redisService.delHotels(key);

        // si no había caché, lo creo
        this.redisService.hSetHotels(key, cacheHotels);

        return [hotel, ...finalHotels];
      }
    } catch (error) {
      throw new NotFoundException('Error fetching hotels', error);
    }
  }



  async fetchOtherHotels(filteredSplitHotels: string[]): Promise<SearchHotelDto[]> {
    const hotelQueries = filteredSplitHotels.map((item) =>
      this.hotelsRepository
        .createQueryBuilder('hotel')
        .distinctOn(['hotel.hotel_id'])
        .leftJoinAndSelect('hotel.address', 'address')
        .leftJoinAndSelect('hotel.amenities', 'amenities')
        .leftJoinAndSelect('hotel.room', 'room')
        .leftJoinAndSelect('room.room_type', 'room_type')
        .leftJoinAndSelect('hotel.availability', 'availability')
        .leftJoinAndSelect('hotel.details', 'details')
        .where('unaccent(hotel.name) ILike unaccent(:query)', { query: `%${item}%` })
        .orderBy('hotel.hotel_id', 'ASC')
        .getMany()
    );

    const otherHotels = (await Promise.all(hotelQueries)).flat();

    const uniqueHotels = Array.from(new Map(otherHotels.map((hotel) => [hotel.hotel_id, hotel])).values());

    return uniqueHotels;
  }

} /* cierre */
