import { Controller, Put } from "@nestjs/common";
import { CredentialsService } from "./credentials.service";

@Controller('credentials')
export class CredentialController {
    constructor(private readonly credentialsService: CredentialsService) {}

    @Put('password/:id')
    ChangePasswordCredentials(id: string, password: number) {
        return this.credentialsService.ChangePasswordCredentials(id, password);
    }

    @Put('email/:id')
    ChangeEmailCredentials(id: string, email: string) {
        return this.credentialsService.ChangeEmailCredentials(id, email);
    }

    @Put('username/:id')
    ChangeUsernameCredentials(id: string, name: string) {
        return this.credentialsService.ChangeUsernameCredentials(id, name);
    }   
}