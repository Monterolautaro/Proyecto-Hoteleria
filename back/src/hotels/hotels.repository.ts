import { BadRequestException, Injectable } from '@nestjs/common';
import { getAccessToken } from 'src/config/api.config';
import { HotelsService } from './hotels.service';
import axios from 'axios';

@Injectable()
export class HotelsRepository {

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


    async addHotels(){
        // const categories = await this.categoriesRepository.find();

        const foundHotel = getAccessToken().then((token) => {
            if (token) {
              this.getHotels(token);
            }});

            console.log(foundHotel);
            

        // foundHotel?.map(async (element) => {
        //     const category = categories.find(
        //         (category) => category.name === element.category,
        //     )
        //     const hotel = new Hotel();
            
        //     hotel.name = element.name;
        //     hotel.description = element.description;
        //     hotel.price = element.price;
        //     hotel.imgUrl = element.imgUrl
        //     hotel.availableRooms = element.availableRooms
        //     hotel.category = category

        //     await this.hotelsRepository
        //     .createQueryBuilder()
        //     .insert()
        //     .into(Hotel)
        //     .values(hotel)
        //     .orUpdate(['description', 'price', 'imgUrl', 'availableRooms'], ['name'])
        //     .execute();
        // })
        return 'hoteles agregados'
  }


}
