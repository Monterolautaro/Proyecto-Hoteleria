
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),  // Importación de TypeOrmModule con la entidad User
    ],
    controllers: [UserController],
    providers: [UserRepository, UserService]
})

export class UsersModule {}