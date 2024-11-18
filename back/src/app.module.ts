import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { HotelsModule } from './hotels/hotels.module';
import { IaModule } from './ia/ia.module';
import { SearchModule } from './search/search.module';
import { FilesUploadModule } from './files-upload/files.module';

dotenvConfig({
  path: '.env',
});
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    FilesUploadModule,
    SearchModule,
    IaModule,
    HotelsModule,
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '15m' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
