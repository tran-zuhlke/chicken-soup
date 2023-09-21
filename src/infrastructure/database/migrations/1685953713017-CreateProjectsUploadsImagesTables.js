"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectsUploadsImagesTables1685953713017 = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../../../persistence/project.entity");
const upload_entity_1 = require("../../../persistence/upload.entity");
const image_entity_1 = require("../../../persistence/image.entity");
class CreateProjectsUploadsImagesTables1685953713017 {
    async up(queryRunner) {
        await queryRunner.startTransaction();
        await queryRunner.createTable(new typeorm_1.Table({
            name: project_entity_1.PROJECTS_TABLE_NAME,
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'tenantId',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'propertyId',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'companyName',
                    type: 'varchar',
                },
                {
                    name: 'destinationPath',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: upload_entity_1.UPLOADS_TABLE_NAME,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'varchar',
                },
                {
                    name: 'projectId',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: image_entity_1.IMAGES_TABLE_NAME,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                },
                {
                    name: 'uploadId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'sourceFilePath',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'sizeInBytes',
                    type: 'int',
                },
                {
                    name: 'lastModified',
                    type: 'varchar',
                },
                {
                    name: 'uploaded',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'checksum',
                    type: 'varchar',
                },
            ],
        }));
        await queryRunner.commitTransaction();
    }
    async down(queryRunner) {
        await queryRunner.startTransaction();
        await queryRunner.dropTable(project_entity_1.PROJECTS_TABLE_NAME);
        await queryRunner.dropTable(upload_entity_1.UPLOADS_TABLE_NAME);
        await queryRunner.dropTable(image_entity_1.IMAGES_TABLE_NAME);
        await queryRunner.commitTransaction();
    }
}
exports.CreateProjectsUploadsImagesTables1685953713017 = CreateProjectsUploadsImagesTables1685953713017;
//# sourceMappingURL=1685953713017-CreateProjectsUploadsImagesTables.js.map