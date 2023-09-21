import { UploadImagesUseCase } from './upload-images.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { GetProjectUseCase } from '../get-project.use-case';
import { GetUploadUseCase } from '../get-upload.use-case';
import { ImageDbEntity } from '../../../../persistence/image.entity';
import { Project } from '../../../../domain/Project';
import { Upload } from '../../../../domain/Upload';
import { UploadStatus } from '../../../../domain/UploadStatus';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image, mapImageToDbEntity } from '../../../../domain/Image';

let generateChecksumMock = jest.fn();
jest.mock('../../validation/generateChecksum', () => ({
  generateChecksum: () => generateChecksumMock(),
}));

const fsWriteFileMock = jest.fn();
const existsSyncMock = jest.fn();
jest.mock('fs', () => ({
  promises: {
    writeFile: (path, buffer) => fsWriteFileMock(path, buffer),
  },
  existsSync: () => existsSyncMock(),
}));

describe(UploadImagesUseCase.name, () => {
  let uploadImagesUseCase: UploadImagesUseCase;
  let getProjectUseCaseMock: jest.Mocked<GetProjectUseCase>;
  let getUploadUseCaseMock: jest.Mocked<GetUploadUseCase>;
  let imageRepositoryMock: jest.Mocked<Repository<ImageDbEntity>>;

  const project: Project = {
    id: '1',
    destinationPath: 'TUVSUD/BLK001/BLK001BAT00000',
    companyName: 'Tüv Süd',
    propertyId: 'BLK001',
    tenantId: 'T-001',
    uploads: [],
  };

  beforeEach(async () => {
    jest.resetModules();

    getProjectUseCaseMock = {
      invokeWithRelations: jest.fn().mockResolvedValue(project),
    } as unknown as jest.Mocked<GetProjectUseCase>;

    getUploadUseCaseMock = {
      invoke: jest.fn(),
    } as unknown as jest.Mocked<GetUploadUseCase>;

    imageRepositoryMock = {
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<ImageDbEntity>>;

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UploadImagesUseCase,
        GetProjectUseCase,
        GetUploadUseCase,
        {
          provide: getRepositoryToken(ImageDbEntity),
          useFactory: jest.fn(() => ({
            save: jest.fn(),
          })),
        },
      ],
    })
      .overrideProvider(GetProjectUseCase)
      .useValue(getProjectUseCaseMock)
      .overrideProvider(GetUploadUseCase)
      .useValue(getUploadUseCaseMock)
      .overrideProvider(getRepositoryToken(ImageDbEntity))
      .useValue(imageRepositoryMock)
      .compile();

    uploadImagesUseCase = app.get<UploadImagesUseCase>(UploadImagesUseCase);
  });

  it('should successfully upload image, given 2 images in metadata with almost same filename', async () => {
    const fileName = 'DJI_20220125105040_0117_Z.JPG';
    const uploadedImage = {
      originalname: fileName,
      mimetype: 'image/jpeg',
      buffer: Buffer.from('something'),
    } as Express.Multer.File;
    const fileChecksum = 'e95c0a303345a7843552ea85ec37818549be5358c1c069dc3d0c282bab71f693';
    const matchingImageMetadata: Image = {
      id: '2',
      checksum: fileChecksum,
      sourceFilePath: `/Photos/DJI_202201251043_003/${fileName}`,
      uploaded: false,
      sizeInBytes: 10000,
      lastModified: '',
    };
    const upload: Upload = {
      id: '1',
      status: UploadStatus.IN_PROGRESS,
      images: [
        {
          id: '1',
          checksum: 'other-checksum',
          sourceFilePath: `/Photos/DJI_202201251043_003/._${fileName}`,
          uploaded: false,
          sizeInBytes: 10000,
          lastModified: '',
        },
        matchingImageMetadata,
      ],
    };

    getUploadUseCaseMock.invoke = jest.fn().mockResolvedValue(upload);
    generateChecksumMock = jest.fn().mockReturnValue(fileChecksum);
    existsSyncMock.mockReturnValue(true);
    fsWriteFileMock.mockReturnValue(Promise.resolve());

    await uploadImagesUseCase.invoke('project-id', 1, [uploadedImage]);

    expect(fsWriteFileMock).toHaveBeenCalledTimes(1);
    expect(fsWriteFileMock).toHaveBeenCalledWith(
      expect.stringContaining(matchingImageMetadata.sourceFilePath),
      uploadedImage.buffer
    );

    expect(imageRepositoryMock.save).toHaveBeenCalledWith([
      { ...mapImageToDbEntity(matchingImageMetadata), uploaded: true },
    ]);
  });
});
