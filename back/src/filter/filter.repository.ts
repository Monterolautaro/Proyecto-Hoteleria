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

    console.log('esta es la query: ', query);
    
    const { price, amenities, city, country } = query;
    
    try {
    
    const key = `hotels:${user_id}`;
    const hotelArray = await this.redisService.hGetHotels(key);

    console.log('hoteles almacenados en el caché:', hotelArray.length);
    
      if (!hotelArray) throw new BadRequestException('No hay resultados almacenados en el caché');

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

      console.log('filtro de city', filteredHotels);
      

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
