import { Body, Controller } from '@nestjs/common';
import { CredentialsService } from './credentials.service';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  getCredentialsByUserID(@Body() user_id: string) {
    return this.credentialsService.getCredentialsByUserID(user_id);
  }
}
