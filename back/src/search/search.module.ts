import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchRepository } from './search.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Address } from 'src/entities/hotel/hotel.address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Address])],
  controllers: [SearchController],
  providers: [SearchService, SearchRepository],
  exports: [],
})
export class SearchModule {}
