import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesUploadService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesDecorator } from 'decorators/roles.decorator';
import { Roles } from 'roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}

  @Post('upload/:id')
  @RolesDecorator(Roles.admin, Roles.hotel_owner)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') roomId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000 /*  1mb  */,
            message: 'file is too heavy',
          }),
          new FileTypeValidator({ fileType: /jpg|jpeg|png|gif|webp|svg/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.filesUploadService.uploadImageToCloudById(file, roomId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @RolesDecorator(Roles.admin, Roles.hotel_owner)
  @UseGuards(RolesGuard)
  async createRoomAndImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000 /*  1mb  */,
            message: 'file is too heavy',
          }),
          new FileTypeValidator({ fileType: /jpg|jpeg|png|gif|webp|svg/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.filesUploadService.createRoomAndImage(file);
  }
}
