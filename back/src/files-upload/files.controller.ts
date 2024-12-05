/* eslint-disable prettier/prettier */
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Files-upload')
@Controller('files')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}

  // http://localhost:4000/files/upload/:id

  @Post('upload/:id')
  @ApiBearerAuth()
  @RolesDecorator(Roles.admin, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
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

  //http://localhost:4000/files/upload/          TERMINAR

  @Post('upload')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @RolesDecorator(Roles.admin, Roles.hotel_owner)
  @UseGuards(AuthGuard, RolesGuard)
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

  // http://localhost:4000/files/upload/profile/:id

  @Post('upload/profile/:id')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @RolesDecorator(Roles.admin, Roles.hotel_owner, Roles.user)
  @UseGuards(AuthGuard, RolesGuard)
  async uploadProfileImage(
    @Param('id') user_id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000 /*  1mb  */,
            message: 'file is too heavy',
          }),
          new FileTypeValidator({ fileType: /jpg|jpeg|png|gif|webp|svg|ico/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.filesUploadService.uploadProfilePhoto(file, user_id);
  }
}
