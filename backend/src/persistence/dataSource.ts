import { DataSource } from 'typeorm';
import * as process from 'process';

export const createDataSource = (): DataSource => {
  return new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/persistence/*.entity.js'],
    // migrations: [__dirname + '/../**/infrastructure/database/migrations/*.js'],
    // migrationsRun: true,
    // logging: ['error', 'migration'],
    ssl: true,
  });
};
