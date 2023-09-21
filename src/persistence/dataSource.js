"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataSource = void 0;
const typeorm_1 = require("typeorm");
const createDataSource = () => {
    return new typeorm_1.DataSource({
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
exports.createDataSource = createDataSource;
//# sourceMappingURL=dataSource.js.map