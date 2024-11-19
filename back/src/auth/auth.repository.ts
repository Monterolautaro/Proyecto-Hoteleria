import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Credentials } from 'src/entities/credentials.entity';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { whenRegister } from 'src/config/nodemailer.config';
import { DataSource } from 'typeorm';
import { UserRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userData: CreateUserDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const foundEmail = await this.userRepository.getUserByEmail(
        userData.email,
      );
      const foundUsername = await this.userRepository.getUserByUsername(
        userData.username,
      );

      if (foundEmail !== null)
        throw new BadRequestException('email already in use');

      if (foundUsername !== null)
        throw new BadRequestException('username already in use');

      if (userData.password !== userData.confirmPassword)
        throw new BadRequestException('Passwords do not match');

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = await queryRunner.manager.create(User, {
        name: userData.name,
        lastname: userData.lastname,
        birthday: userData.birthday,
      });

      await queryRunner.manager.save(user);

      const credential = await queryRunner.manager.create(Credentials, {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        user,
      });

      await queryRunner.manager.save(credential);

      await queryRunner.manager.update(User, user.user_id, {
        credential,
      });

      await queryRunner.commitTransaction();

      whenRegister(userData.email)

      return { status: 200, message: 'User created successfully' };
    } catch (error) {
      queryRunner.rollbackTransaction();

      throw new BadRequestException(
        'An error has ocurred creating user',
        error,
      );
    } finally {
      queryRunner.release();
    }
  }

  async signIn(email: string, password: string) {
    try {
      if (!email || !password) return 'data is required';
      const foundUser = await this.userRepository.getUserByEmail(email);
      if (foundUser === null)
        throw new NotFoundException('User not registered');

      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.credential.password,
      );

      if (!isPasswordValid)
        throw new UnauthorizedException('Invalid credentials');

      const payload = {
        id: foundUser.user_id,
        email,
        isAdmin: foundUser.isAdmin,
      };

      const token = this.jwtService.sign(payload);
      return { success: "You're logged in successfully", token };
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong signing in',
        error,
      );
    }
  }
}
