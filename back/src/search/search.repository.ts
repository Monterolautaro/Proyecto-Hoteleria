/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchHotelDto } from 'src/dto/search-hotel.dto';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SearchRepository {
  constructor(
    @InjectRepository(Hotel) private hotelsRepository: Repository<Hotel>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}
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

  async searchBarResults(query: any) {
    try {
      // Busco hoteles, o ciudades, o paises segun el query
      const foundHotel = await this.hotelsRepository
        .createQueryBuilder('hotel')
        .leftJoinAndSelect('hotel.address', 'address')
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

        // añado otros hoteles similares a lo que se buscó
        const splitHotels = query.split(' ');

        const otherHotels: SearchHotelDto[] = await this.hotelsRepository
          .createQueryBuilder('hotel')
          .where('unaccent(hotel.name) ILike unaccent(:query)', {
            query: `%${query}%`,
          })
          .leftJoinAndSelect('hotel.address', 'address')
          .orWhere('unaccent(address.city) ILike unaccent(:query)', {
            query: `%${query}%`,
          })
          .orWhere('unaccent(address.country) ILike unaccent(:query)', {
            query: `%${query}%`,
          })
          .distinctOn(['hotel.name', 'address.city', 'address.country'])
          .leftJoinAndSelect('hotel.amenities', 'amenities')
          .leftJoinAndSelect('hotel.room', 'room')
          .leftJoinAndSelect('room.room_type', 'room_type')
          .leftJoinAndSelect('hotel.availability', 'availability')
          .leftJoinAndSelect('hotel.details', 'details')
          .getMany();

        return [hotel, ...otherHotels];
      }
    } catch (error) {
      throw new NotFoundException('Error fetching hotels', error);
    }
  }
} /* cierre */
