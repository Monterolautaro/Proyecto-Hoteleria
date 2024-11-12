import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { connectionSource } from './config/typeorm';
config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  connectionSource.initialize()
  .then(() => {
   console.log('Data source has been initialized!');
   app.listen(process.env.PORT ?? 3000);
  })
  .catch((error) => console.error('Error during Data Source initialization:', error))


}
bootstrap();
