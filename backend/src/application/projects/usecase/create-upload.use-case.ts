import { Injectable, Logger } from '@nestjs/common';
import { ProjectDbEntity } from '../../../persistence/project.entity';
import { DataSource } from 'typeorm';
import { UploadMetadata } from '../types/UploadMetadata';
import { mapUploadFromDbEntity, Upload } from '../../../domain/Upload';
import { UploadDbEntity } from '../../../persistence/upload.entity';
import { UploadStatus } from '../../../domain/UploadStatus';
import { ImageDbEntity } from '../../../persistence/image.entity';

@Injectable()
export class CreateUploadUseCase {
  private readonly logger = new Logger(CreateUploadUseCase.name);

  constructor(private readonly dataSource: DataSource) {}

  async invoke(projectId: string, uploadMetadata: UploadMetadata): Promise<Upload> {
    return await this.dataSource.transaction(async (transactionalEntityManager) => {
      let project = await transactionalEntityManager.findOne(ProjectDbEntity, {
        where: { id: projectId },
        relations: ['uploads', 'uploads.images'],
      });
      if (!project) {
        project = await transactionalEntityManager.save(ProjectDbEntity, {
          id: projectId,
          uploads: [],
        });
        this.logger.log(`Created new project ${projectId}`);
      }

      const newUpload = await transactionalEntityManager.save(UploadDbEntity, {
        status: UploadStatus.NEW,
        project: project,
      });
      this.logger.log(`Created new upload with id ${newUpload.id} for project ${project.id}`);

      await transactionalEntityManager.save(
        ImageDbEntity,
        uploadMetadata.images.map((image) => ({ ...image, upload: newUpload, uploaded: false }))
      );

      const createdUpload = await transactionalEntityManager.findOne(UploadDbEntity, {
        where: { id: newUpload.id },
        relations: ['images'],
      });
      this.logger.log(`Saved image metadata for project ${projectId} and upload ${newUpload.id}`);
      return mapUploadFromDbEntity(createdUpload);
    });
  }
}
