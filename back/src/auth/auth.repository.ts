import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Credentials } from 'src/entities/credentials.entity';
import { User } from 'src/entities/users/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
//import { whenRegister } from 'src/config/nodemailer.config';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/dto/user.dto';
import { Roles } from 'roles.enum';
import { MailService } from 'src/mail/mail.service';
import { SendEmailDto } from 'src/Interfaces/mail.interface';
import { ModeloHTML } from 'src/mail/modelHTML/model';
import { VerificationCode } from 'src/entities/verification-codes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,
    @InjectRepository(User)
    private readonly entityUserRepository: Repository<User>,
  ) { }

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
        role: [Roles.user],
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
      

      throw new BadRequestException(
        'An error has ocurred creating user',
        error,
      );
    } finally {
      queryRunner.release();
    }
  }

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
      return { status: 200, message: 'User created successfully', codigo_de_verificación: verificationCode };
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
        verified: foundUser.verified,
        role: foundUser.role,
      };

      const token = this.jwtService.sign(payload);
      return { success: "You're logged in successfully", token };
    } catch (error) {
      throw new BadRequestException('Something got wrong signing in', error);
    }
  }

  async verifyAccountCode(user_id: string, code: string): Promise<any> {
    try {
      const foundCode = await this.verificationCodeRepository.findOneBy({
        user_id,
      });
      if (!foundCode) throw new NotFoundException('Code not found');

      if (foundCode.code !== code)
        throw new BadRequestException('Invalid code');

      await this.entityUserRepository.update({ user_id }, { verified: true });

      // MANDAR EMAIL DE CONFIRMACION DE CUENTA // TERMINAR

      return { status: 200, message: 'Account verified successfully' };
    } catch (e) {
      throw new BadRequestException('Error verifying account', e);
    }
  }
}
