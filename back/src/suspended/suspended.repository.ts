import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuspendRepository{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

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

