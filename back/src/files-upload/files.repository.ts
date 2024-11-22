import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FilesUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    try {
      return new Promise((resolve, reject) => {
        // Subimos la imagen a cloudinary
        const upload = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
          },
          // El segundo parametro de upload_stream es esta funcion callback
          (error, result) => {
            if (error) reject(error);
            // Si no hay errores, se le pasa el resultado
            resolve(result);
          },
        );
        // Convertimos el archivo a flujo y lo subimos a cloudinary
        toStream(file.buffer).pipe(upload);
      });
    } catch (error) {
      throw new BadRequestException(
        'Error uploading image to Cloudinary',
        error,
      );
    }
  }

  async generateSecureUrl(publicId: string) {
    try {
      if (!publicId) throw new BadRequestException('Public ID is required');

      // configuramos la URL para que la imagen tenga los valores que queremos
      return cloudinary.url(publicId, {
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
          { crop: 'fill', gravity: 'auto', width: 1280, height: 720 },
        ],
      });
    } catch (error) {
      throw new BadRequestException('Error generating secure URL', error);
    }
  }
}
