import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from 'src/entities/credentials.entity';
import { Repository } from 'typeorm';

export class CredentialsRepository {
  constructor(
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
  ) {}

  async getCredentialsByUserID(user_id: string) {
    try {
      //  const foundCredential = await this.credentialsRepository.findOneBy({user_id})
    } catch (error) {}
  }
}
