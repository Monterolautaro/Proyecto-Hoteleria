import { Injectable } from '@nestjs/common';
import { getAccessToken } from 'src/config/api.config';
import { HotelsService } from './hotels.service';

@Injectable()
export class HotelsRepository {
    constructor(private readonly hotelsService: HotelsService) {}

    async addHotels(){
        // const categories = await this.categoriesRepository.find();

        const foundHotel = getAccessToken().then((token) => {
            if (token) {
              this.hotelsService.getHotels(token);
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
