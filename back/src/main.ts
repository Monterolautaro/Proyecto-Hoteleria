import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { connectionSource } from './config/typeorm.config';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
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
