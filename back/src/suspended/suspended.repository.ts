import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class SuspendRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

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
