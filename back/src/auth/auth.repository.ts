import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from 'src/entities/credentials.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private newUserRepository: Repository<User>,
    
    @InjectRepository(Credentials)
    private credentialsRepository: Repository<Credentials>,
  ) {}

  async signUp(name: string, lastname: string, birthday: string, username: string, email: string, password: string) {
    //return 'succesfully registered';
    const existingUser = await this.credentialsRepository.findOne({ where: { email }  });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const credentials = this.credentialsRepository.create({ username, email, password: hashedPassword });
    await this.credentialsRepository.save(credentials);

    const users = this.newUserRepository.create({ name, lastname, birthday, credential: credentials });
    return this.newUserRepository.save(users);
  }

  

  async signIn(email: string, password: string) {
    //return 'succesfully logged in';
    const credentials = await this.credentialsRepository.findOne({ where: { email }, relations: ['user'] });

    if (!credentials) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, credentials.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return credentials.user;
  }

}
