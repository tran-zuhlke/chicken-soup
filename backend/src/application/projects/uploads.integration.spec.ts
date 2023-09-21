import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProjectsModule } from './projects.module';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { GlobalExceptionFilter } from '../../infrastructure/filters/global-exception.filter';
import { ProjectAuthorizationGuard } from '../../infrastructure/guards/project-authorization.guard';
import { UploadStatus } from '../../domain/UploadStatus';
import { ProjectDbEntity } from '../../persistence/project.entity';
import { UploadDbEntity } from '../../persistence/upload.entity';
import { Upload } from '../../domain/Upload';
import { UpdateUploadRequest } from './dtos/update-upload.request';
import { ImageDbEntity } from '../../persistence/image.entity';
import { CreateUploadRequest } from './dtos/create-upload.request';
import { UpdateChecksumRequest } from './dtos/update-checksum.request';

describe('Uploads integration tests', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule, ProjectsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();
  });

  describe('PUT /api/projects/:id/uploads/:uploadId', () => {
    it('should update an existing upload', async () => {
      const dataSource = moduleFixture.get<DataSource>(DataSource);
      const project: ProjectDbEntity = {
        id: 'BLK001BAT00000',
        propertyId: 'BLK001',
        tenantId: 'T001',
        companyName: 'Tüv Süd',
        uploads: [],
        destinationPath: '',
      };
      const upload: UploadDbEntity = {
        id: 1,
        status: UploadStatus.NEW,
        project: project,
        images: [],
      };
      const entityManager = dataSource.createEntityManager();
      await entityManager.save(ProjectDbEntity, project);
      await entityManager.save(UploadDbEntity, upload);
      const updateUploadRequest: UpdateUploadRequest = {
        uploadStatus: UploadStatus.IN_PROGRESS,
      };
      const expectedUpload: Upload = {
        id: '1',
        status: UploadStatus.IN_PROGRESS,
        images: [],
      };

      const response = await request(app.getHttpServer())
        .put(`/api/projects/${project.id}/uploads/${upload.id}`)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .send(updateUploadRequest)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(expectedUpload);
    });
  });

  describe('POST /api/projects/:id/uploads', () => {
    it('should create new upload with relation to project', async () => {
      const dataSource = moduleFixture.get<DataSource>(DataSource);
      const project: ProjectDbEntity = {
        id: 'BLK001BAT00000',
        propertyId: 'BLK001',
        tenantId: 'T001',
        companyName: 'Tüv Süd',
        uploads: [],
        destinationPath: '',
      };
      const upload: UploadDbEntity = {
        id: 1,
        status: UploadStatus.NEW,
        project: project,
        images: [],
      };
      const image1: ImageDbEntity = {
        id: 1,
        sourceFilePath: '/parent_folder/image1.jpg',
        sizeInBytes: 1080,
        lastModified: '',
        uploaded: true,
        checksum: '',
        upload: upload,
      };
      const entityManager = dataSource.createEntityManager();
      await entityManager.save(ProjectDbEntity, project);
      await entityManager.save(UploadDbEntity, upload);
      await entityManager.save(ImageDbEntity, image1);

      const image2 = {
        sourceFilePath: '/parent_folder/image2.jpg',
        sizeInBytes: 1080,
        lastModified: '',
        uploaded: false,
        checksum: '',
      };
      const createUploadRequest: CreateUploadRequest = {
        uploadMetadata: {
          images: [image2],
        },
      };
      const expectedUpload: Upload = {
        id: '2',
        status: UploadStatus.NEW,
        images: [{ ...image2, id: '2' }],
      };

      const response = await request(app.getHttpServer())
        .post(`/api/projects/${project.id}/uploads`)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .send(createUploadRequest)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(expectedUpload);
      const newUpload = await entityManager.findOneBy(UploadDbEntity, { id: 2 });
      expect(newUpload.project).not.toBeNull();
    });
  });

  describe('PUT api/projects/:projectId/uploads/:uploadId/imagesChecksum', () => {
    it('should update images checksum metadata of upload', async () => {
      const dataSource = moduleFixture.get<DataSource>(DataSource);
      const project: ProjectDbEntity = {
        id: 'BLK001BAT00000',
        propertyId: 'BLK001',
        tenantId: 'T001',
        companyName: 'Tüv Süd',
        uploads: [],
        destinationPath: '',
      };
      const upload: UploadDbEntity = {
        id: 1,
        status: UploadStatus.IN_PROGRESS,
        project: project,
        images: [],
      };
      const image1: ImageDbEntity = {
        id: 1,
        sourceFilePath: '/parent_folder/image1.jpg',
        sizeInBytes: 1080,
        lastModified: '',
        uploaded: true,
        checksum: '',
        upload: undefined,
      };
      const image2: ImageDbEntity = {
        id: 2,
        sourceFilePath: '/parent_folder/image2.jpg',
        sizeInBytes: 1080,
        lastModified: '',
        uploaded: false,
        checksum: '',
        upload: undefined,
      };
      const image1Checksum = '00';
      const image2Checksum = '01';

      const entityManager = dataSource.createEntityManager();
      await entityManager.save(ProjectDbEntity, project);
      await entityManager.save(UploadDbEntity, upload);
      await entityManager.save(ImageDbEntity, { ...image1, upload: upload });
      await entityManager.save(ImageDbEntity, { ...image2, upload: upload });
      const updateChecksumRequest: UpdateChecksumRequest = {
        imagesChecksumMetadata: [
          {
            sourceFilePath: image1.sourceFilePath,
            checksum: image1Checksum,
          },
          {
            sourceFilePath: image2.sourceFilePath,
            checksum: image2Checksum,
          },
        ],
      };
      const expectedUpload: Upload = {
        id: '1',
        status: UploadStatus.IN_PROGRESS,
        images: [
          { ...image1, id: '1', checksum: image1Checksum },
          { ...image2, id: '2', checksum: image2Checksum },
        ],
      };

      const response = await request(app.getHttpServer())
        .put(`/api/projects/${project.id}/uploads/${upload.id}/imagesChecksum`)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .send(updateChecksumRequest)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(expectedUpload);
    });
  });

  describe('POST api/projects/:projectId/uploads/:uploadId/start', () => {
    it('should upload images data of upload', async () => {
      const dataSource = moduleFixture.get<DataSource>(DataSource);
      const project: ProjectDbEntity = {
        id: 'BLK001BAT00000',
        propertyId: 'BLK001',
        tenantId: 'T001',
        companyName: 'Tüv Süd',
        uploads: [],
        destinationPath: '',
      };
      const upload: UploadDbEntity = {
        id: 1,
        status: UploadStatus.IN_PROGRESS,
        project: project,
        images: [],
      };
      const image1Checksum = '736bf95996d40c71307e3727931b721dfb17bd27c441b903a6dd483b37021ac1';
      const image2Checksum = '736bf95996d40c71307e3727931b721dfb17bd27c441b903a6dd483b37021ac1';
      const image1: ImageDbEntity = {
        id: 1,
        sourceFilePath: '/parent_folder/image1.jpg',
        sizeInBytes: 1080,
        lastModified: '',
        uploaded: true,
        checksum: image1Checksum,
        upload: undefined,
      };
      const image2: ImageDbEntity = {
        id: 2,
        sourceFilePath: '/parent_folder/image2.jpg',
        sizeInBytes: 1080,
        lastModified: '',
        uploaded: false,
        checksum: image2Checksum,
        upload: undefined,
      };

      const entityManager = dataSource.createEntityManager();
      await entityManager.save(ProjectDbEntity, project);
      await entityManager.save(UploadDbEntity, upload);
      await entityManager.save(ImageDbEntity, { ...image1, upload: upload });
      await entityManager.save(ImageDbEntity, { ...image2, upload: upload });
      const expectedUpload = {
        uploadedFiles: [
          {
            originalName: 'image1.jpg',
          },
          {
            originalName: 'image2.jpg',
          },
        ],
      };

      const testFile = 'testFile';
      const response = await request(app.getHttpServer())
        .post(`/api/projects/${project.id}/uploads/${upload.id}/start`)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .attach('files', Buffer.from(testFile, 'utf-8'), {
          // add file info accordingly
          filename: image1.sourceFilePath,
          contentType: 'image/jpeg',
        })
        .attach('files', Buffer.from(testFile, 'utf-8'), {
          // add file info accordingly
          filename: image2.sourceFilePath,
          contentType: 'image/jpeg',
        })
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(expectedUpload);
    });
  });
});
