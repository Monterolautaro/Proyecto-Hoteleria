import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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

            const booking = await this.bookingRepository.findOne({
                where: {
                    booking_id
                }
            })

            if(booking.isDeleted === true) return new ConflictException('Booking already deleted');

            const result = await this.bookingRepository.update(booking_id, {
                isDeleted: true
            })
    
            if(result.affected === 0) return new NotFoundException('Booking not found');

            return {
                status: 200,
                message: `Your booking has been deleted successfully`,
            };
        } catch (error) {

            if(error instanceof NotFoundException) {
                throw error.message
            }

            throw new BadRequestException('Error deleting booking', error);
        }
        

    }
}