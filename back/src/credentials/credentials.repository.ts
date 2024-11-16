import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credentials } from '../Entities/Credentials.entity';
import { BadRequestError } from 'cohere-ai/api';

@Injectable()
export class CredentialsRepository {
  constructor(
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
  ) {}

  async ChangePasswordCredentials(id: string, password: number) {
    try {
      const result = await this.credentialsRepository.update(
        { credential_id: id },
        { password },
      );
      if (result.affected === 0) {
        throw new BadRequestError(
          'No se encontró la credencial para actualizar la contraseña',
        );
      }
      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      return { error: `Error al cambiar la contraseña: ${error.message}` };
    }
  }

  async ChangeEmailCredentials(id: string, email: string) {
    try {
      const result = await this.credentialsRepository.update(
        { credential_id: id },
        { email },
      );
      if (result.affected === 0) {
        throw new BadRequestError(
          'No se encontró la credencial para actualizar el email',
        );
      }
      return { message: 'Email actualizado correctamente' };
    } catch (error) {
      return { error: `Error al cambiar el email: ${error.message}` };
    }
  }

  async ChangeUsernameCredentials(id: string, name: string) {
    try {
      const result = await this.credentialsRepository.update(
        { credential_id: id },
        { username: name },
      );
      if (result.affected === 0) {
        throw new BadRequestError(
          'No se encontró la credencial para actualizar el nombre de usuario',
        );
      }
      return { message: 'Nombre de usuario actualizado correctamente' };
    } catch (error) {
      return {
        error: `Error al cambiar el nombre de usuario: ${error.message}`,
      };
    }
  }
}
