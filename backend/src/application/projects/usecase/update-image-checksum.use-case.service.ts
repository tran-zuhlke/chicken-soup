import { Injectable, Logger } from '@nestjs/common';
import { mapUploadFromDbEntity, Upload } from '../../../domain/Upload';
import { UploadDbEntity } from '../../../persistence/upload.entity';
import { DataSource, In } from 'typeorm';
import { ImageChecksumMetadata } from '../types/UploadMetadata';
import { ImageDbEntity } from '../../../persistence/image.entity';

@Injectable()
export class UpdateImageChecksumUseCase {
  private readonly logger = new Logger(UpdateImageChecksumUseCase.name);

  constructor(private readonly dataSource: DataSource) {}

  async invoke(uploadId: number, imagesChecksumMetadata: ImageChecksumMetadata[]): Promise<Upload> {
    return await this.dataSource.transaction(async (transactionalEntityManager) => {
      const checksumMap = imagesChecksumMetadata.reduce(function (map, obj) {
        map[obj.sourceFilePath] = obj.checksum;
        return map;
      }, {});

      const images = await transactionalEntityManager.findBy(ImageDbEntity, {
        sourceFilePath: In(Object.keys(checksumMap)),
        upload: { id: uploadId },
      });

      for (const image of images) {
        image.checksum = checksumMap[image.sourceFilePath];
      }

      await transactionalEntityManager.save(ImageDbEntity, images);
      this.logger.log(`Updated images checksum metadata for upload ${uploadId}`);

      const updatedUpload = await transactionalEntityManager.findOne(UploadDbEntity, {
        where: { id: uploadId },
        relations: ['images'],
      });

      return mapUploadFromDbEntity(updatedUpload);
    });
  }
}
