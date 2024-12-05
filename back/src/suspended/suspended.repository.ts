import { Repository } from 'typeorm';
<<<<<<< HEAD
import { User } from '../entities/user.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuspendRepository{
=======
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class SuspendRepository {
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

<<<<<<< HEAD
    async suspendUser(names: string): Promise<void> {
    try{
      const user = await this.userRepository.findOne({
        where: { name: names },
      });
      if (!user || user.isSuspend) {
        throw new NotFoundException('Something got wrong getting suspend users');
      }
      user.isSuspend = true;
      await this.userRepository.save(user);

    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting suspend users',
        error,
      );
    }
    }
  
    async unsuspendUser(names: string): Promise<void> {
    try{
      const user = await this.userRepository.findOne({
        where: { name: names },
      });
      if (!user || !user.isSuspend) {
        throw new NotFoundException('Something got wrong getting suspend users');
      }
      user.isSuspend = false;
      await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting suspend users',
        error,
      );
    }
    }
}

=======
  async suspendUser(user_id: string): Promise<void> {
  try{
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });
    if (!user) {
      throw new NotFoundException('Something got wrong getting suspend users');
    }
    user.isSuspend = true;
    await this.userRepository.save(user);

  } catch (error) {
    throw new BadRequestException(
      'Something got wrong getting suspend users',
      error,
    );
  }
  }

  async unsuspendUser(user_id: string): Promise<void> {
  try{
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });
    if (!user) {
      throw new NotFoundException('Something got wrong getting suspend users');
    }
    user.isSuspend = false;
    await this.userRepository.save(user);
  } catch (error) {
    throw new BadRequestException(
      'Something got wrong getting suspend users',
      error,
    );
  }
  }
}
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
