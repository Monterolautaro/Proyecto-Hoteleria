import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "src/entities/booking.entity";
import { HotelsModule } from "src/hotels/hotels.module";




@Module({
    imports:[TypeOrmModule.forFeature([Booking]), HotelsModule],
    controllers:[],
    providers:[],
    exports:[],
})
export class BookingsModule{}