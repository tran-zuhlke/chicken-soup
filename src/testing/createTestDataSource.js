"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestDataSource = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../persistence/project.entity");
const upload_entity_1 = require("../persistence/upload.entity");
const image_entity_1 = require("../persistence/image.entity");
const createTestDataSource = async () => {
    const testDataSource = new typeorm_1.DataSource({
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [project_entity_1.ProjectDbEntity, upload_entity_1.UploadDbEntity, image_entity_1.ImageDbEntity],
        synchronize: true,
    });
    await testDataSource.initialize();
    await testDataSource.synchronize();
    return testDataSource;
};
exports.createTestDataSource = createTestDataSource;
//# sourceMappingURL=createTestDataSource.js.map