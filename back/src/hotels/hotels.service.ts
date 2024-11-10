import { BadRequestException, Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';
import axios from 'axios';

@Injectable()
export class HotelsService {
    constructor(private readonly hotelsRepository: HotelsRepository) {}


    async addHotels() {
        return await this.hotelsRepository.addHotels();
    }

    
    // ESTA FUNCION ES PARTE DE ADDHOTELS, NO AGREGAR AL CONTROLLER
    async getHotels(accessToken) {
        const hotelsUrl = 'https://test.api.amadeus.com/v2/shopping/hotels/by-hotel-id';
      
        try {
          const response = await axios.get(hotelsUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              hotelIds: 'id_del_hotel',  // Reemplazar con el ID del hotel
            },
          });
      
          console.log('Hotel data:', response.data);
        } catch (error) {
          throw new BadRequestException('Failed to obtain hotel data');
        }
      }

}
