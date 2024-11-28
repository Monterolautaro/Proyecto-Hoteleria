import { BadRequestException, Injectable } from '@nestjs/common';
import { SuspendRepository } from './suspended.repository';

@Injectable()
export class SuspendService {
  constructor(private readonly suspendRepository: SuspendRepository) {}

  // async suspendUser(name: string): Promise<void> {
  //   try {
  //     return this.suspendRepository.suspendUser(name);
  //   } catch (error) {
  //     throw new BadRequestException(
  //       'Something got wrong getting suspend user',
  //       error,
  //     );
  //   }
  // }

  // async unsuspendUser(name: string): Promise<void> {
  //   try {
  //     return this.suspendRepository.unsuspendUser(name);
  //   } catch (error) {
  //     throw new BadRequestException(
  //       'Something got wrong getting suspend user',
  //       error,
  //     );
  //   }
  // }
}
