import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';
import { FilterRepository } from './filter.repository';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
import { RoomType } from 'src/entities/hotel/rooms/roomsType.entity';
import { HotelsRepository } from 'src/hotels/hotels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Amenities, RoomType, Hotel])],
  controllers: [FilterController],
  providers: [FilterService, FilterRepository],
  exports: [],
})
export class FilterModule {}
