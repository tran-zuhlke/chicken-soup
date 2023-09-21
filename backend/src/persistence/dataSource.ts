import { DataSource } from 'typeorm';

export const createDataSource = (): DataSource => {
  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/persistence/*.entity.js'],
    migrations: [__dirname + '/../**/infrastructure/database/migrations/*.js'],
    migrationsRun: true,
    logging: ['error', 'migration'],
  });
};
