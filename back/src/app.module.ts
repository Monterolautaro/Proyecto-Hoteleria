import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { HotelsModule } from './hotels/hotels.module';
import { IaModule } from './ia/ia.module';
import { SearchModule } from './search/search.module';
import { PaymentsModule } from './payments/payments.module';
import { FilesUploadModule } from './files-upload/files.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.Module';
import { StripeModule } from './stripe/stripe.module';
import { FilterModule } from './filter/filter.module';
import { nuevoStripeModule } from './nuevoPayments/nuevoPayments.module';



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
    nuevoStripeModule,
    StripeModule,
    FilterModule,
    MailModule,
    FilesUploadModule,
    SearchModule,
    PaymentsModule,
    IaModule,
    HotelsModule,
    AuthModule,
    UsersModule,
    NewStripeModule,
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
