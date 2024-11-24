import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiltersDto } from 'src/dto/filter.dto';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilterRepository {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelsRepository: Repository<Hotel>,
  ) {}
  async searchFilter(query: FiltersDto): Promise<Hotel[]> {
    console.log('esta es la query', query);

    const { price, amenities, city, country } = query;

    try {
      const queryBuilder = this.hotelsRepository.createQueryBuilder('hotel');

      // aca uno las relaciones para poder usarlas en el where
      queryBuilder
        .leftJoinAndSelect('hotel.address', 'address')
        .leftJoinAndSelect('hotel.amenities', 'amenities')
        .leftJoinAndSelect('hotel.room', 'room')
        .leftJoinAndSelect('room.room_type', 'room_type')
        .leftJoinAndSelect('hotel.availability', 'availability')
        .leftJoinAndSelect('hotel.details', 'details');

      // filtro por precio
      if (price) {
        const [minPrice, maxPrice] = price.split(',').map(Number);
        queryBuilder.andWhere(
          'room_type.price BETWEEN :minPrice AND :maxPrice',
          {
            minPrice,
            maxPrice,
          },
        );
      }

      // filtro por country
      if (country) {
        queryBuilder.andWhere('address.country = :country', { country });
      }

      // filtro por city
      if (city) {
        queryBuilder.andWhere('address.city = :city', { city });
      }

      // filtro por amenities
      if (amenities) {
        const amenitiesArray = amenities
          .trim()
          .split(',')
          .map((name) => name.trim());
        amenitiesArray.forEach((amenity) => {
          queryBuilder.andWhere(`amenities.${amenity} = true`);
        });
      }

      // ejecuto la consulta
      const results = await queryBuilder.getMany();
      
      // console.log(results);
      return results;
    } catch (error) {
      console.log({ message: 'Error en el filtrado', error });
      throw new NotFoundException('Error loading hotels', error);
    }
  }
} /* cierre */
