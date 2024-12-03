import { BadRequestException, Injectable } from '@nestjs/common';
import { SuspendRepository } from './suspended.repository';

@Injectable()
export class SuspendService {
  constructor(private readonly suspendRepository: SuspendRepository) {}

  async suspendUser(user_id: string): Promise<void> {
    try {
      return this.suspendRepository.suspendUser(user_id);
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting suspend user',
        error,
      );
    }
  }

  async unsuspendUser(user_id: string): Promise<void> {
    try {
      return this.suspendRepository.unsuspendUser(user_id);
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting suspend user',
        error,
      );
    }
  }
}
