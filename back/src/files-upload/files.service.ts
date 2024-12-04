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
import { Room } from 'src/entities/hotel/rooms/hotel.rooms.entity';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly filesUploadRepository: FilesUploadRepository,
    @InjectRepository(RoomFile)
    private readonly roomFileRepository: Repository<RoomFile>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async uploadImageToCloudById(file: Express.Multer.File, roomId: string): Promise<any> {
    try {
      // Buscamos la habitación que queremos subir la foto
      const room = await this.roomRepository.findOneBy({ room_id: roomId });

      if (!room) throw new NotFoundException('Room not found');

      // Subimos la imagen a Cloudinary
      const result = await this.filesUploadRepository.uploadImage(file);

      // Generamos la URL "https"
      const url = await this.filesUploadRepository.generateSecureUrl(
        result.public_id,
      );

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
      throw new BadRequestException('Error in logic service' + error);
    }
  }

  // EndPoint para crear la habitación, con las imagenes (rol: hotel_owner)
  createRoomAndImage(file: Express.Multer.File) {
    throw new Error('Method not implemented.');
  }

  async uploadProfilePhoto(file: Express.Multer.File, user_id: string): Promise<any> {
    try {

      const foundUser = await this.userRepository.findOneBy({ user_id });

      if (!foundUser) throw new NotFoundException('User not found');

      // Subimos la imagen a Cloudinary
      const result = await this.filesUploadRepository.uploadImage(file);

      // Generamos la URL "https"
      const url = await this.filesUploadRepository.generateSecureUrl(
        result.public_id,
      );

      // se la añadimos al usuario
      foundUser.profile_photo = url;
      await this.userRepository.save(foundUser);

      return {
        status: 'succeeded',
        message: `Profile photo was uploaded successfully`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }

      throw new BadRequestException('Error uploading profile photo', error);

    }
  }
}
