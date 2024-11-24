import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Credentials } from 'src/entities/credentials.entity';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { connectionSource } from 'src/config/typeorm.config';

import { JwtService } from '@nestjs/jwt';
import { whenRegister } from 'src/config/nodemailer.config';
import { DataSource } from 'typeorm';
import { UserRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/dto/user.dto';
import { Roles } from 'roles.enum';

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
        role: [Roles.user]
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

<<<<<<< HEAD
      await queryRunner.commitTransaction();

      whenRegister(userData.email)

      return { status: 200, message: 'User created successfully' };
    } catch (error) {
      queryRunner.rollbackTransaction();
=======

      const dto: SendEmailDto = {
        //from: { name: 'Lucy', address: 'lucy@example.com'}, Esto seria un ejmplo
        recipients: [{ name: '%name%', address: '%email%' }],
        subject: "Hotelefy",
        html: ModeloHTML,
        codigo: 10,
        placeHolderReplacements: [userData.email, userData.name],
      }

      this.mailService.sendEmail(dto);

      await queryRunner.commitTransaction();
      return { status: 200, message: 'User created successfully' };
    } catch (error) {
      queryRunner.rollbackTransaction();

>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d

      throw new BadRequestException(
        'An error has ocurred creating user',
        error,
      );
    } finally {
      queryRunner.release();
    }
  }

<<<<<<< HEAD
=======
  async signUpHotelOwner(userData: CreateUserDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const now = new Date();
    const expires_at = new Date(now.getTime() + 15 * 60 * 1000);

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
        role: [Roles.hotel_owner],
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

      const user_id = user.user_id;

      const verificationCode = await queryRunner.manager.create(
        VerificationCode,
        {
          code: randomBytes(6).toString('hex'),
          user_id: user_id,
          expires_at: expires_at,
        },
      );
      await queryRunner.manager.save(verificationCode);

      // MANDAR CODIGO POR MAIL // TERMINAR

      await queryRunner.commitTransaction();
      return { status: 200, message: 'User created successfully'  };
    } catch (error) {

      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction()
        return { status: 400, message: `An error has ocurred creating user`, error };
      }
      throw new BadRequestException(
        'An error has ocurred creating user',
        error,
      );
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }
>>>>>>> 14ca74a4746127459b59a6b0c5599da968c5167d

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
        role: foundUser.role,
      };

      const token = this.jwtService.sign(payload);
      return { success: "You're logged in successfully", token, user: payload };
    } catch (error) {
      throw new BadRequestException(
        'Something got wrong signing in',
        error,
      );
    }
  }
}
