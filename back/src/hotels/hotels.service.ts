import { BadRequestException, Injectable } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';

@Injectable()
export class HotelsService {
    constructor(private readonly hotelsRepository: HotelsRepository) {}


    async addHotels() {
        return await this.hotelsRepository.addHotels();
    }

}
