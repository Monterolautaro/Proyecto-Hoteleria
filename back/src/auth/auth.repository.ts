import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
    signUp( name, lastname, birthday, username, email, password ) {
        return 'succesfully registered'
    }
    signIn() {
        return 'succesfully logged in'
    }
}