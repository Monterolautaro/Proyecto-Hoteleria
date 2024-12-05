/* eslint-disable prettier/prettier */
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
import { FilterModule } from './filter/filter.module';
import { StripeModule } from './nuevoPayments/nuevoPayments.module';
import { MailModule } from './mail/mail.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { MetricsModule } from './metrics/metrics.module';
import { SuspendedModule } from './suspended/suspended.module';
import { BookingsModule } from './bookings/bookings.module';


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
    MailModule,
    BookingsModule,
    MetricsModule,
    MercadopagoModule,
    StripeModule,
    FilterModule,
    FilesUploadModule,
    SearchModule,
    PaymentsModule,
    IaModule,
    HotelsModule,
    AuthModule,
    UsersModule,
    SuspendedModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '35m' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
