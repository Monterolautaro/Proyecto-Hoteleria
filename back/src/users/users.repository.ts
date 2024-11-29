import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Credentials } from 'src/entities/credentials.entity';
import * as bcrypt from 'bcryptjs';
import { Roles } from 'roles.enum';
import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
    private readonly dataSource: DataSource,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find();
      if (!users) throw new NotFoundException('No users found');
      return users;
    } catch (error) {
      throw new BadRequestException('Something got wrong getting users', error);
    }
  }

  async getUserById(user_id): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneBy({
        user_id,
      });
      if (!user) throw new NotFoundException(`User ${user_id} not found`);

      return user;
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting user by id',
        error,
      );
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { credential: { email } },
        relations: { credential: true },
      });

      return user || null;
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting user by email',
        error,
      );
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { credential: { username } },
      });

      return user || null;
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting user by username',
        error,
      );
    }
  }

  async deleteUser(user_id: string): Promise<any> {
    try {
      if (!user_id) throw new NotFoundException(`User ${user_id} not found`);

      await this.userRepository.delete({ user_id });

      return { status: 'success', message: `User ${user_id} has been deleted` };
    } catch (error) {
      throw new BadRequestException('Something got wrong deleting user', error);
    }
  }

  async changePassword(
    user_id: string,
    password: string,
    newPassword: string,
  ): Promise<any> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { user_id },
        relations: { credential: true },
      });

      const verifyPassword = await bcrypt.compare(
        password,
        user.credential.password,
      );
      if (!verifyPassword) throw new BadRequestException('Incorrect password');

      if (!user) throw new NotFoundException(`User ${user_id} not found`);

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const credential_id = user.credential.credential_id;

      await this.credentialsRepository.update(
        { credential_id },
        { password: hashedPassword },
      );

      return {
        status: 200,
        message: `User ${user_id} password has been updated to ${newPassword}`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong changing password',
        error,
      );
    }
  }

  async changeEmail(user_id: string, email: string): Promise<any> {
    try {
      const user: User = await this.userRepository.findOneBy({
        user_id,
      });

      if (!user) throw new NotFoundException(`User ${user_id} not found`);

      const credential_id: string = user.credential.credential_id;

      await this.credentialsRepository.update({ credential_id }, { email });

      return {
        status: 200,
        message: `User ${user_id} email has been updated to ${email}`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong changing email',
        error,
      );
    }
  }

  async changeUsername(user_id: string, newUsername: string): Promise<any> {
    try {
      const user = await this.userRepository.findOneBy({
        user_id,
      });
      if (!user) throw new NotFoundException(`User ${user_id} not found`);

      const credential_id = user.credential.credential_id;

      await this.credentialsRepository.update(
        { credential_id },
        { username: newUsername },
      );

      return {
        status: 200,
        message: `User ${user_id} username has been updated to ${newUsername}`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong changing username',
        error,
      );
    }
  }

  async makeAdmin(user_id: string): Promise<any> {
    try {
      const user = await this.userRepository.findOneBy({
        user_id,
      });

      if (!user) throw new NotFoundException(`User ${user_id} not found`);

      await this.userRepository.update({ user_id }, { role: [Roles.admin] });

      return {
        status: 200,
        message: `User ${user_id} has been made admin`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong making user an admin',
        error,
      );
    }
  }

  async putUsers(user_id: string, userData: Partial<CreateUserDto>): Promise<any> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
    
      try {
        // Buscar al usuario existente por su ID
        const user = await this.userRepository.findOne({
          where: { user_id },
          //relations: ['credential'],
          relations: { credential: true },
        });
    
        if (!user) throw new NotFoundException(`User with ID ${user_id} not found`);
    
        // Validar si el email está en uso por otro usuario
        if (userData.email && userData.email !== user.credential.email) {
          const foundEmail = await this.getUserByEmail(userData.email);
          if (foundEmail) throw new BadRequestException('Email already in use');
        }
    
        // Validar si el username está en uso por otro usuario
        if (userData.username && userData.username !== user.credential.username) {
          const foundUsername = await this.getUserByUsername(userData.username);
          if (foundUsername) throw new BadRequestException('Username already in use');
        }
    
        // Validar contraseñas si están incluidas en el body
        if (userData.password ) {
          // Hashear nueva contraseña
          const hashedPassword = await bcrypt.hash(userData.password, 10);
          user.credential.password = hashedPassword;
        }
    
        // Actualizar las propiedades del usuario
        if (userData.name) user.name = userData.name;
        if (userData.lastname) user.lastname = userData.lastname;
        if (userData.birthday) user.birthday = userData.birthday;
        if (userData.email) user.credential.email = userData.email;
        if (userData.username) user.credential.username = userData.username;
        // Guardar cambios
        await queryRunner.manager.save(user);
        await queryRunner.manager.save(user.credential);
    
        await queryRunner.commitTransaction();
    
        return { status: 200, message: `User ${user_id} updated successfully` };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException('An error occurred updating the user', error);
      } finally {
        await queryRunner.release();
      }
    }
    
}
    

