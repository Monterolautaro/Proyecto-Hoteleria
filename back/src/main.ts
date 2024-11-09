import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { client } from './config/pg.config';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  client.connect()
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('Error connecting to DB', err));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
