import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "src/entities/booking.entity";
import { Repository } from "typeorm";





@Injectable()
export class BookingsRepository {
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    ) {}

    async softDeleteBooks(booking_id: string) {

        try {
            const result = await this.bookingRepository.update(booking_id, {
                isDeleted: true
            })
    
            if(result.affected === 0) throw new NotFoundException('Booking not found');

            return {
                status: 200,
                message: `Your booking has been deleted successfully`,
            };
        } catch (error) {
            
            if(error instanceof NotFoundException) {
                throw error
            }

            throw new BadRequestException('Error deleting booking', error);
        }
        

    }
}