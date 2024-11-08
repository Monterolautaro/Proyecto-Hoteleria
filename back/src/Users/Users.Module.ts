
import { Module } from '@nestjs/common';
import { UserService } from './User.Service';
import { UserController } from './User.Controller';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})

export class UsersModule {}