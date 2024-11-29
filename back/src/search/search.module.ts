import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchRepository } from './search.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel/hotel.entity';
import { Address } from 'src/entities/hotel/hotel.address.entity';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Address]), RedisModule],
  controllers: [SearchController],
  providers: [SearchService, SearchRepository, RedisService],
  exports: [],
})
export class SearchModule {}
