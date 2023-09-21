import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProjectsModule } from './projects.module';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { seedTestData } from '../../testing/seedTestData';
import { Project } from '../../domain/Project';
import { projectDetails } from '../../api/mocks/facade-api.mock-handlers';
import { apiMocks } from '../../api/mocks/api.mocks';
import { rest } from 'msw';
import { ExceptionDto } from '../../infrastructure/exception.dto';
import { GlobalExceptionFilter } from '../../infrastructure/filters/global-exception.filter';
import { v4 } from 'uuid';
import { ProjectAuthorizationGuard } from '../../infrastructure/guards/project-authorization.guard';
import { UploadStatus } from '../../domain/UploadStatus';
import { CreateProjectRequest } from './dtos/create-project.request';
import { CheckProjectAuthorizationRequest } from './dtos/check-project-authorization.request';
import { FacadeApiErrorResponse } from '../../api/facadeApi/facade-api.dtos';

describe('Projects integration tests', () => {
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

  describe('GET /api/project/:id', () => {
    it('should get an existing project', async () => {
      const dataSource = moduleFixture.get<DataSource>(DataSource);
      await seedTestData(dataSource);
      const expectedProject: Project = {
        id: 'BLK001BAT00000',
        tenantId: 'T001',
        propertyId: 'BLK001',
        companyName: 'Tüv Süd',
        destinationPath: '',
        uploads: [
          {
            id: '1',
            status: UploadStatus.COMPLETE,
            images: [
              {
                id: '1',
                sourceFilePath: 'upload1/1.jpg',
                checksum: '',
                sizeInBytes: 3000000,
                lastModified: '2023-05-30T06:11:13.921Z',
                uploaded: true,
              },
              {
                id: '2',
                sourceFilePath: 'upload1/2.jpg',
                checksum: '',
                sizeInBytes: 3000000,
                lastModified: '2023-05-30T06:11:13.921Z',
                uploaded: true,
              },
            ],
          },
          {
            id: '2',
            status: UploadStatus.NEW,
            images: [
              {
                id: '3',
                sourceFilePath: 'upload2/3.jpg',
                checksum: '',
                sizeInBytes: 3000000,
                lastModified: '2023-05-30T06:11:13.921Z',
                uploaded: true,
              },
            ],
          },
        ],
      };

      const response = await request(app.getHttpServer())
        .get(`/api/projects/${expectedProject.id}`)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(expectedProject);
    });

    it("should return NOT_FOUND error if project doesn't exist", async () => {
      const url = '/api/projects/unknown-project-id';

      const response = await request(app.getHttpServer())
        .get(url)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body).toEqual({
        path: url,
        message: 'Project not found',
        status: HttpStatus.NOT_FOUND,
      } as ExceptionDto);
    });

    it('should return FORBIDDEN error if no project token is provided', async () => {
      const response = await request(app.getHttpServer()).get('/api/projects/P1').expect(HttpStatus.FORBIDDEN);

      expect(response.body).toEqual({
        path: '/api/projects/P1',
        message: expect.any(String),
        status: HttpStatus.FORBIDDEN,
      } as ExceptionDto);
    });
  });

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const createProjectRequest: CreateProjectRequest = {
        projectId: 'BLK001BAT00000',
        tenantId: 'T001',
        propertyId: 'BLK001',
        companyName: 'Tüv Süd',
        destinationPath: '',
      };
      const expectedProject: Project = {
        id: createProjectRequest.projectId,
        tenantId: createProjectRequest.tenantId,
        propertyId: createProjectRequest.propertyId,
        companyName: createProjectRequest.companyName,
        destinationPath: '',
        uploads: [],
      };

      const createProjectResponse = await request(app.getHttpServer())
        .post('/api/projects')
        .send(createProjectRequest)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .expect(HttpStatus.CREATED);
      expect(createProjectResponse.body).toEqual(expectedProject);

      const getProjectResponse = await request(app.getHttpServer())
        .get(`/api/projects/${expectedProject.id}`)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .expect(HttpStatus.OK);
      expect(getProjectResponse.body).toEqual(expectedProject);
    });

    it('should return FORBIDDEN error if no project token is provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/projects')
        .send({ projectId: v4() })
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body).toEqual({
        path: '/api/projects',
        message: 'Forbidden resource',
        status: HttpStatus.FORBIDDEN,
      } as ExceptionDto);
    });
  });

  describe('POST /api/projects/authorization', () => {
    it("should return a project's details if the provided authorization request is valid", async () => {
      const requestPayload: CheckProjectAuthorizationRequest = {
        projectToken: 'valid-project-token',
        tenantId: projectDetails.tenantId,
        projectUploadId: 'project-upload-id',
      };

      const response = await request(app.getHttpServer())
        .post('/api/projects/authorization')
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .send(requestPayload)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(projectDetails);
    });

    it('should return internal server error if failed to call facade api', async () => {
      const originalErrorMessage = 'Failed to validate token';
      const url = '/api/projects/authorization';
      const errorResponse: FacadeApiErrorResponse = {
        message: { error: originalErrorMessage, status: false },
      };
      apiMocks.use(
        rest.post(`${process.env.FACADE_API_BASE_URL}/temp-login`, async (req, res, ctx) => {
          return res(ctx.status(HttpStatus.INTERNAL_SERVER_ERROR), ctx.json(errorResponse));
        })
      );

      const response = await request(app.getHttpServer())
        .post(url)
        .set(ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER, 'project-upload-id')
        .set(ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER, 'project-token')
        .set(ProjectAuthorizationGuard.TENANT_ID_HEADER, 'tenant-id')
        .send({ projectToken: 'valid-project-token' })
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(response.body).toEqual({
        path: url,
        message: originalErrorMessage,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      } as ExceptionDto);
    });
  });
});
