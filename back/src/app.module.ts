import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './Users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { HotelsModule } from './hotels/hotels.module';

dotenvConfig({
  path: '.env'
})
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig]
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      configService.get('typeorm')
  }), HotelsModule ,AuthModule, UsersModule, JwtModule.register({
    global: true,
    signOptions: { expiresIn: '1h' },
    secret: process.env.JWT_SECRET
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
