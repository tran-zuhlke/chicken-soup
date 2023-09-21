import { DataSource } from 'typeorm';
import { ProjectDbEntity } from '../persistence/project.entity';
import { UploadDbEntity } from '../persistence/upload.entity';
import { ImageDbEntity } from '../persistence/image.entity';

export const createTestDataSource = async () => {
  const testDataSource: DataSource = new DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    entities: [ProjectDbEntity, UploadDbEntity, ImageDbEntity],
    synchronize: true,
  });
  await testDataSource.initialize();
  await testDataSource.synchronize();
  return testDataSource;
};
