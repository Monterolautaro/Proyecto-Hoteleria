import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({
  path: '.env',
});


                // para correr docker, comentar el DB_HOST y descomentar el host: postgres
                // para correr el entorno local, comentar postgres y descomentar el DB_HOST


const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,                 
  // host: 'postgresdb',                             
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  //dropSchema: true,
  logging: true,
};


/*                                CONFIG PARA DEPLOY
             comentar siempre que se trabaje localmente con base de datos LOCAL.           */

// const config = {
//   type: 'postgres',
//   database: process.env.RENDER_DB_NAME,
//   host: process.env.RENDER_DB_HOST,                                            
//   port: process.env.RENDER_DB_PORT as unknown as number,
//   username: process.env.RENDER_DB_USERNAME,
//   password: process.env.RENDER_DB_PASSWORD,
//   entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
//   autoLoadEntities: true,
//   synchronize: true,
//   //dropSchema: true,
//   logging: true,
// };


export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
