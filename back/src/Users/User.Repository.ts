import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Credentials } from 'src/entities/credentials.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find();
      if (!users) throw new NotFoundException('No users found');
      return users;
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting users',
        error,
      );
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
      throw new BadRequestException(
        'Something got wrong deleting user',
        error,
      );
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
}
