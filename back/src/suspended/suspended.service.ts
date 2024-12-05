import { BadRequestException, Injectable } from '@nestjs/common';
import { SuspendRepository } from './suspended.repository';

@Injectable()
export class SuspendService {
<<<<<<< HEAD
  constructor(
    private readonly suspendRepository: SuspendRepository
  ) {}

  async suspendUser(name: string): Promise<void> {
    try {
      return this.suspendRepository.suspendUser(name);
=======
  constructor(private readonly suspendRepository: SuspendRepository) {}

  async suspendUser(user_id: string): Promise<void> {
    try {
      return this.suspendRepository.suspendUser(user_id);
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting suspend user',
        error,
      );
    }
  }

<<<<<<< HEAD
  async unsuspendUser(name: string): Promise<void> {
    try {
      return this.suspendRepository.unsuspendUser(name);
=======
  async unsuspendUser(user_id: string): Promise<void> {
    try {
      return this.suspendRepository.unsuspendUser(user_id);
>>>>>>> af11fb3d8cb9531aae96de2c3b69dc1249047869
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong getting suspend user',
        error,
      );
    }
  }
}
