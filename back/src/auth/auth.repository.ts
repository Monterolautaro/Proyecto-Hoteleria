import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
    register() {
        return 'succesfully registered'
    }
    login() {
        return 'succesfully logged in'
    }
}