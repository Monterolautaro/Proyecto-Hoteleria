import { Injectable } from "@nestjs/common";
import { BookingsRepository } from "./bookings.repository";





@Injectable()
export class BookingsService {
    constructor(private readonly bookingsService: BookingsRepository) {}

    async softDeleteBooks(booking_id: string) {
        return await this.bookingsService.softDeleteBooks(booking_id);
    }
}