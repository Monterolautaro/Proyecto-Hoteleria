import { Injectable, NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
import { connectionSource } from 'src/config/typeorm.config';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { RoomType } from 'src/entities/hotel/roomsType.entity';
import { Between, Like } from 'typeorm';
=======
import { InjectRepository } from '@nestjs/typeorm';
import { FiltersDto } from 'src/dto/filter.dto';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { HotelsRepository } from 'src/hotels/hotels.repository';
import { Repository } from 'typeorm';
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d


@Injectable()
export class FilterRepository {
<<<<<<< HEAD
  async searchFilter(price: any, country: any, city: any, emtities: any) {
    try {
    // Price - RoomType
    const [min, max] = price/*.split(' - ').map(Number)*/;
    const prices = await roomTypesRepository.find({
    where: { price: Between(min, max) },
    });
=======
  constructor(@InjectRepository(Hotel)
   private  readonly hotelsRepository: Repository<Hotel>) {}
  async searchFilter(query: FiltersDto): Promise<Hotel[]> {
    console.log('esta es la query', query);
    
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d

    const { price, amenities, city, country } = query

    try {    
      const queryBuilder = this.hotelsRepository.createQueryBuilder('hotel');

<<<<<<< HEAD
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
=======
    // aca uno las relaciones para poder usarlas en el where
    queryBuilder
      .leftJoinAndSelect('hotel.address', 'address')
      .leftJoinAndSelect('hotel.amenities', 'amenities')
      .leftJoinAndSelect('hotel.room', 'room')
      .leftJoinAndSelect('room.room_type', 'room_type')

    // filtro por precio
    if (price) {
      const [minPrice, maxPrice] = price.split(',').map(Number);
      queryBuilder.andWhere('room_type.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d
      });
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
      const amenitiesArray = amenities.trim().split(',').map((name) => name.trim());
      amenitiesArray.forEach((amenity) => {
        queryBuilder.andWhere(`amenities.${amenity} = true`);
      });
    }

<<<<<<< HEAD
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
=======
    // ejecuto la consulta
    const results = await queryBuilder.getMany();
    console.log('estos son los resultados', results);
    
    return results;
  
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d
    } catch (error) {

      console.log({message: 'Error en el filtrado', error});
      throw new NotFoundException('Error loading hotels', error);

    }
  }
} /* cierre */