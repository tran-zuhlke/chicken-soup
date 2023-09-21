import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UploadStatus } from '../../../domain/UploadStatus';
import { mapUploadFromDbEntity, Upload } from '../../../domain/Upload';
import { UploadDbEntity } from '../../../persistence/upload.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateUploadStatusUseCase {
  private readonly logger = new Logger(UpdateUploadStatusUseCase.name);

  constructor(private readonly dataSource: DataSource) {}

  async invoke(projectId: string, uploadId: number, uploadStatus: UploadStatus): Promise<Upload> {
    const updatedUpload = await this.dataSource.transaction(async (transactionalEntityManager) => {
      const upload = await transactionalEntityManager.findOne(UploadDbEntity, {
        where: { id: uploadId },
        relations: ['images'],
      });
      if (!upload) {
        throw new NotFoundException(`Upload with id ${uploadId} not found`);
      }
      upload.status = uploadStatus;
      await transactionalEntityManager.save(UploadDbEntity, upload);
      this.logger.log(`Updated upload ${uploadId} for project ${projectId}`);
      return upload;
    });
    return mapUploadFromDbEntity(updatedUpload);
  }
}
