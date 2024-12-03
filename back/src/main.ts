import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { connectionSource } from './config/typeorm.config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map(error => {
        return {
          property: error.property,
          constraints: error.constraints
        }
      })
      return new BadRequestException({
        alert: "se han detectado los siguientes errores:",
        errors: cleanErrors
      });}}))

    const swaggerConfig = new DocumentBuilder()
    .setTitle('Hotelify')
    .setDescription(
      'This is the documentation for the Hotelify API in which you can find all the endpoints and interact with them.'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

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
