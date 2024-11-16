import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FilesUploadService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('files')
export class FilesUploadController{
    constructor(private readonly filesUploadService: FilesUploadService) {}

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Param('id') roomId: string, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 1000000,
                message: 'file is too heavy'
            }),
            new FileTypeValidator({ fileType: /jpg|jpeg|png|gif|webp|svg/ }),
        ]
    })) file: Express.Multer.File) {
        
        return await this.filesUploadService.uploadImageToCloud(file, roomId)
    }

}