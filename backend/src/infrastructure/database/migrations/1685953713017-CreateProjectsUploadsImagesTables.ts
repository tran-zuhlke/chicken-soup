import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { PROJECTS_TABLE_NAME } from '../../../persistence/project.entity';
import { UPLOADS_TABLE_NAME } from '../../../persistence/upload.entity';
import { IMAGES_TABLE_NAME } from '../../../persistence/image.entity';

export class CreateProjectsUploadsImagesTables1685953713017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    await queryRunner.createTable(
      new Table({
        name: PROJECTS_TABLE_NAME,
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
      })
    );

    await queryRunner.createTable(
      new Table({
        name: UPLOADS_TABLE_NAME,
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
      })
    );

    await queryRunner.createTable(
      new Table({
        name: IMAGES_TABLE_NAME,
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
      })
    );

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    await queryRunner.dropTable(PROJECTS_TABLE_NAME);
    await queryRunner.dropTable(UPLOADS_TABLE_NAME);
    await queryRunner.dropTable(IMAGES_TABLE_NAME);
    await queryRunner.commitTransaction();
  }
}
