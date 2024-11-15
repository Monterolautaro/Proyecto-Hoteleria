import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  signUp(name, lastname, birthday, username, email, password) {
    return 'succesfully registered';
  }
  signIn(email, password) {
    return 'succesfully logged in';
  }
}
