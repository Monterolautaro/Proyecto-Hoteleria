import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './Users/Users.Module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
