import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { connectionSource } from './config/typeorm.config';
config();

// se dividen las url's por comas, y se pasan a un array

// const allowedOrigins = process.env.URL_FRONT?.split(',') || [];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://proyecto-hoteleria-m3sgbl0uy-monterolautaros-projects.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  connectionSource
    .initialize()
    .then(() => {
      console.log('Data source has been initialized!');
      app.listen(process.env.PORT ?? process.env.ALTERNATIVE_PORT);
    })
    .catch((error) =>
      console.error('Error during Data Source initialization:', error),
    );
}
bootstrap();
