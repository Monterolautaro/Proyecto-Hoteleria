import { Injectable } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  async getCredentialsByUserID(user_id: string) {
    return this.credentialsRepository.getCredentialsByUserID(user_id);
  }
}
