import { Module } from "@nestjs/common";
import { FilesUploadController } from "./files.controller";
import { FilesUploadRepository } from "./files.repository";
import { FilesUploadService } from "./files.service";
import { cloudinaryConfig } from "src/config/cloudinary.config";



@Module({
    imports: [],
    controllers: [FilesUploadController],
    providers: [FilesUploadRepository, FilesUploadService, cloudinaryConfig],
    exports: [],
})
export class FilesUploadModule {}