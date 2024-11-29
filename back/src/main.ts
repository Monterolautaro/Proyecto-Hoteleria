import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { connectionSource } from './config/typeorm.config';
config();

// se dividen las url's por comas, y se pasan a un array

const allowedOrigins = process.env.URL_FRONT?.split(',') || [];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.use(cookieParser());

  connectionSource
    .initialize()
    .then(() => {
      console.log('Data source has been initialized!');
      app.listen(process.env.PORT ?? process.env.ALTERNATIVE_PORT);
      console.log(
        `Server running on port ${process.env.PORT ?? process.env.ALTERNATIVE_PORT}`,
      );
    })
    .catch((error) =>
      console.error('Error during Data Source initialization:', error),
    );
}
bootstrap();
