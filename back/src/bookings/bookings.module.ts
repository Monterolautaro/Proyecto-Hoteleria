import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "src/entities/booking.entity";
import { HotelsModule } from "src/hotels/hotels.module";
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";
import { BookingsRepository } from "./bookings.repository";




@Module({
    imports:[TypeOrmModule.forFeature([Booking]), HotelsModule],
    controllers:[BookingsController],
    providers:[BookingsService, BookingsRepository],
    exports:[],
})
export class BookingsModule{}