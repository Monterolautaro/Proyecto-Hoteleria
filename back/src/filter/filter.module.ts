import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';
import { FilterRepository } from './filter.repository';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
<<<<<<< HEAD
import { RoomType } from 'src/entities/hotel/roomsType.entity';
=======
import { RoomType } from 'src/entities/hotel/rooms/roomsType.entity';
import { HotelsRepository } from 'src/hotels/hotels.repository';
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d

@Module({
  imports: [TypeOrmModule.forFeature([Address, Amenities, RoomType, Hotel])],
  controllers: [FilterController],
  providers: [FilterService, FilterRepository],
  exports: [],
})
export class FilterModule {}