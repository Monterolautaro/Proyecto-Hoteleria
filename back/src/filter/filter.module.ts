import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';
import { FilterRepository } from './filter.repository';
import { Amenities } from 'src/entities/hotel/hotel.amenities.entity';
import { RoomType } from 'src/entities/hotel/roomsType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Amenities, RoomType])],
  controllers: [FilterController],
  providers: [FilterService, FilterRepository],
  exports: [],
})
export class FilterModule {}