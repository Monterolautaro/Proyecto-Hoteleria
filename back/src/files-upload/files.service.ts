import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilesUploadRepository } from './files.repository';
import { RoomFile } from 'src/entities/hotel/rooms/room.file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from 'src/entities/hotel/hotel.rooms.entity';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly filesUploadRepository: FilesUploadRepository,
    @InjectRepository(RoomFile)
    private readonly roomFileRepository: Repository<RoomFile>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  async uploadImageToCloudById(file: Express.Multer.File, roomId: string) {
    try {
      // Subimos la imagen a Cloudinary
      const result = await this.filesUploadRepository.uploadImage(file);

      // Generamos la URL "https"
      const url = await this.filesUploadRepository.generateSecureUrl(
        result.public_id,
      );

      // Buscamos la habitación que queremos subir la foto
      const room = await this.roomRepository.findOneBy({ room_id: roomId });

      if (!room) throw new NotFoundException('Room not found');

      // Se la añadimos a la habitación
      await this.roomFileRepository.save({
        file_url: url,
        room: room,
      });

      return {
        status: 'success',
        message: `RoomFile ${url} was uploaded successfully in room ${roomId}`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Error in logic service' + error
      );
    }
  }

  // EndPoint para crear la habitación, con las imagenes (rol: hotel_owner)
  createRoomAndImage(file: Express.Multer.File) {
    throw new Error('Method not implemented.');
  }
}
