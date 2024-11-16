import { Module } from "@nestjs/common";
import { FilesUploadController } from "./files.controller";
import { FilesUploadRepository } from "./files.repository";
import { FilesUploadService } from "./files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomFile } from "src/entities/hotel/rooms/room.file.entity";
import { Room } from "src/entities/hotel/hotel.rooms.entity";
import { cloudinaryConfig } from "src/config/cloudinary.config";



@Module({
    imports: [TypeOrmModule.forFeature([RoomFile, Room])],
    controllers: [FilesUploadController],
    providers: [FilesUploadService, FilesUploadRepository, cloudinaryConfig],
    exports: [],
})
export class FilesUploadModule {}