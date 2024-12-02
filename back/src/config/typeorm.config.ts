import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({
  path: '.env',
});

// Si se trabaja en localhost y se requiere usar docker, el host es:     postgresdb

// para iniciar la api localmente:             NODE_ENV=development npm run dev

// para iniciar la api en produccion:           NODE_ENV=production npm run dev

export const getDatabaseConfig = (): DataSourceOptions => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    type: 'postgres',
    host: isProduction ? process.env.DB_HOST_PROD : process.env.DB_HOST_LOCAL,
    port: isProduction
      ? Number(process.env.DB_PORT_PROD)
      : Number(process.env.DB_PORT_LOCAL),
    username: isProduction
      ? process.env.DB_USERNAME_PROD
      : process.env.DB_USERNAME_LOCAL,
    password: isProduction
      ? process.env.DB_PASSWORD_PROD
      : process.env.DB_PASSWORD_LOCAL,
    database: isProduction
      ? process.env.DB_NAME_PROD
      : process.env.DB_NAME_LOCAL,
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    // dropSchema: true,
    logging: true,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  } as DataSourceOptions;
};

const config = getDatabaseConfig();

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);
