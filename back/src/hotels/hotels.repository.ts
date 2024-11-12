import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Details } from 'src/entities/hotel/hotel.details.entity';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { Availability } from 'src/entities/hotel/hotel.availability.entity';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
import { Room } from 'src/entities/hotel/hotel.rooms.entity';
import { RoomType } from 'src/entities/hotel/roomsType.entity';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { connectionSource } from 'src/config/typeorm';


@Injectable()
export class HotelsRepository {
  
  async addHotels(){
  /*
    ## No terminado
                        */

    // for (const hotelData of filePath) {
    //   await connectionSource.transaction(async transactionalEntityManager => {
        
    //     const details = transactionalEntityManager.create(Details, hotelData.details);
    //     await transactionalEntityManager.save(details);
    
    
    //     const address = transactionalEntityManager.create(Address, hotelData.address);
    //     await transactionalEntityManager.save(address);
    
    
    //     const availability = transactionalEntityManager.create(Availability, hotelData.availability);
    //     await transactionalEntityManager.save(availability);
    

    //     const amenities = transactionalEntityManager.create(Amenities, hotelData.amenities);
    //     await transactionalEntityManager.save(amenities);
    
    //     // Crear y guardar `Rooms` y `RoomType`
    //     const rooms = new Room();
    //     await transactionalEntityManager.save(rooms);
    
    //     const roomTypes = Object.keys(hotelData.rooms).map(type => {
    //       return transactionalEntityManager.create(RoomType, {
    //         rooms,
    //         type,
    //         ...hotelData.rooms[type]
    //       });
    //     });
    
    //     await transactionalEntityManager.save(RoomType, roomTypes);
    
    //     // Crear y guardar `Hotel`
    //     const hotel = transactionalEntityManager.create(Hotel, {
    //       name: hotelData.name,
    //       details,
    //       address,
    //       availability,
    //       amenities,
    //       rooms
    //     });
    //     await transactionalEntityManager.save(hotel);
    
    //     console.log("Hotel data saved successfully");
    //   });
    // }
  }
}
