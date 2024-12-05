import { Body, Controller, Param, ParseUUIDPipe, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesDecorator } from "decorators/roles.decorator";
import { Roles } from "roles.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { BookingsService } from "./bookings.service";






@Controller('bookings')
export class BookingsController{
    constructor(private readonly bookingsService: BookingsService) {}

    @Put('/soft-delete/:id')
    @ApiBearerAuth()
    @RolesDecorator(Roles.admin, Roles.user, Roles.hotel_owner)
    @UseGuards(AuthGuard, RolesGuard)
    softDeleteBooks(@Param('id', ParseUUIDPipe) booking_id: string, @Body('note') note: string) {

        console.log(note);
        
        return this.bookingsService.softDeleteBooks(booking_id);
    }

}