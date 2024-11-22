import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { HotelsRepository } from './hotels.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Room } from 'src/entities/hotel/rooms/hotel.rooms.entity';
import { RoomType } from 'src/entities/hotel/rooms/roomsType.entity';
import { Details } from 'src/entities/hotel/hotel.details.entity';
import { Availability } from 'src/entities/hotel/hotel.availability.entity';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
import { Address } from 'src/entities/hotel/hotel.address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hotel,
      Room,
      RoomType,
      Details,
      Availability,
      Amenities,
      Address,
    ]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService, HotelsRepository],
  exports: [HotelsService],
})
export class HotelsModule {}
