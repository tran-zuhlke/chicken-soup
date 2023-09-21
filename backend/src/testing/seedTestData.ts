import { DataSource } from 'typeorm';
import { ProjectDbEntity } from '../persistence/project.entity';
import { UploadDbEntity } from '../persistence/upload.entity';
import { UploadStatus } from '../domain/UploadStatus';
import { ImageDbEntity } from '../persistence/image.entity';

export const projects: ProjectDbEntity[] = [
  {
    id: 'BLK001BAT00000',
    tenantId: 'T001',
    propertyId: 'BLK001',
    companyName: 'Tüv Süd',
    uploads: [],
    destinationPath: '',
  },
  {
    id: 'BLK002BAT00000',
    tenantId: 'T002',
    propertyId: 'BLK002',
    companyName: 'Zühlke Engineering',
    uploads: [],
    destinationPath: '',
  },
  {
    id: 'BLK003BAT00000',
    tenantId: 'T003',
    propertyId: 'BLK003',
    companyName: 'Drone Inc.',
    uploads: [],
    destinationPath: '',
  },
];

export const uploads: UploadDbEntity[] = [
  {
    id: 1,
    status: UploadStatus.COMPLETE,
    project: projects.find((p) => p.id === 'BLK001BAT00000'),
    images: [],
  },
  {
    id: 2,
    status: UploadStatus.NEW,
    project: projects.find((p) => p.id === 'BLK001BAT00000'),
    images: [],
  },
];

export const images: ImageDbEntity[] = [
  {
    id: 1,
    sourceFilePath: 'upload1/1.jpg',
    checksum: '',
    upload: uploads.find((u) => u.id === 1),
    sizeInBytes: 3000000,
    lastModified: '2023-05-30T06:11:13.921Z',
    uploaded: true,
  },
  {
    id: 2,
    sourceFilePath: 'upload1/2.jpg',
    checksum: '',
    upload: uploads.find((u) => u.id === 1),
    sizeInBytes: 3000000,
    lastModified: '2023-05-30T06:11:13.921Z',
    uploaded: true,
  },
  {
    id: 3,
    sourceFilePath: 'upload2/3.jpg',
    checksum: '',
    upload: uploads.find((u) => u.id === 2),
    sizeInBytes: 3000000,
    lastModified: '2023-05-30T06:11:13.921Z',
    uploaded: true,
  },
];

export const seedTestData = async (dataSource: DataSource) => {
  const entityManager = dataSource.createEntityManager();

  await entityManager.save(ProjectDbEntity, projects);
  await entityManager.save(UploadDbEntity, uploads);
  await entityManager.save(ImageDbEntity, images);
};
