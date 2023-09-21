import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { mapUploadFromDbEntity, Upload } from '../../../domain/Upload';
import { UploadDbEntity } from '../../../persistence/upload.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GetUploadUseCase {
  private readonly logger = new Logger(GetUploadUseCase.name);

  constructor(private readonly dataSource: DataSource) {}

  async invoke(projectId: string, uploadId: number): Promise<Upload> {
    this.logger.debug(`Invoked ${GetUploadUseCase.name} for projectId ${projectId} and uploadId: ${uploadId}`);
    const upload = await this.dataSource.transaction(async (transactionalEntityManager) => {
      const upload = await transactionalEntityManager.findOne(UploadDbEntity, {
        where: { id: uploadId },
        relations: ['images'],
      });
      if (!upload) {
        throw new NotFoundException(`Upload with id ${uploadId} not found`);
      }
      return upload;
    });
    return mapUploadFromDbEntity(upload);
  }
}
