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
  ) { }
  async searchBar(query: any) {
    try {

      // Hotel names
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

  async searchByCountry(country: string) {
    if (country === 'Argentina') {
      // buscar en la base de datos
    }
  }

  async searchBarResults(query: any) {
    try {

      const foundHotel = await this.hotelsRepository.find({
        where: { name: Like(`%${query}%`) },
      });

      if (foundHotel.length > 0) {
        const hotelId = foundHotel[0].hotel_id
        const hotel: SearchHotelDto = await this.hotelsRepository.findOne(
          {
            where: { hotel_id: hotelId },
            relations: {
              address: true,
              amenities: true,
              availability: true,
              room: {
                room_type: true
              },
              details: true
            }
          });

        // const otherHotels: SearchHotelDto[] = (await this.hotelsRepository.find({
        //   where: { address: { country: hotel.address.country } },
        //   relations: {
        //     address: true,
        //     amenities: true,
        //     availability: true,
        //     room: {
        //       room_type: true
        //     },
        //     details: true
        //   }
        // })
        // );
        // const filteredHotels = otherHotels.filter(hotel => hotel.hotel_id !== hotel[0].hotel_id)
         
        console.log(hotel);
          
        return hotel
      }

      const foundCountry = await this.addressRepository.find({
        where: { country: Like(`%${query}%`) },
      });
      if (foundCountry.length > 0) {
        const foundHotel = await this.hotelsRepository.findOne({
          where: { address: { country: foundCountry[0].country } },
          relations: {
            address: true,
            amenities: true,
            availability: true,
            room: {
              room_type: true
            },
            details: true
          }
        });

        return foundHotel;
      }

      const foundCity = await this.addressRepository.find({
        where: { city: Like(`%${query}%`) },
      });
      if (foundCity.length > 0) {
        const foundHotel = await this.hotelsRepository.findOne({
          where: { address: { city: foundCity[0].city } },
          relations: {
            address: true,
            amenities: true,
            availability: true,
            room: {
              room_type: true
            },
            details: true
          }
        });

        return foundHotel;
      }

    } catch (error) {
      throw new NotFoundException('Error fetching hotels', error);
    }
  }




} /* cierre */



