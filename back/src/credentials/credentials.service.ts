import { Injectable } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  ChangePasswordCredentials(id: string, password: number) {
    return this.credentialsRepository.ChangePasswordCredentials(id, password);
  }

  ChangeEmailCredentials(id: string, email: string) {
    return this.credentialsRepository.ChangeEmailCredentials(id, email);
  }

  ChangeUsernameCredentials(id: string, name: string) {
    return this.credentialsRepository.ChangeUsernameCredentials(id, name);
  }
}
