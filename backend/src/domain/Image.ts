import { ImageDbEntity as ImageDbEntity } from '../persistence/image.entity';
import { ImageResponse } from '../application/projects/dtos/image.response';

export interface Image {
  id: string;
  sourceFilePath: string;
  checksum: string;
  sizeInBytes: number;
  lastModified: string;
  uploaded: boolean;
}

export const mapImageFromDbEntity = (imageDbEntity: ImageDbEntity): Image => ({
  id: imageDbEntity.id.toString(),
  sourceFilePath: imageDbEntity.sourceFilePath.toString(),
  checksum: imageDbEntity.checksum.toString(),
  sizeInBytes: imageDbEntity.sizeInBytes,
  lastModified: imageDbEntity.lastModified,
  uploaded: imageDbEntity.uploaded,
});

export const mapImageToDbEntity = (image: Image): ImageDbEntity =>
  ({
    id: Number(image.id),
    sourceFilePath: image.sourceFilePath,
    checksum: image.checksum,
    sizeInBytes: image.sizeInBytes,
    lastModified: image.lastModified,
    uploaded: image.uploaded,
  } as ImageDbEntity);

export const mapImageToResponse = (image: Image): ImageResponse => ({
  id: image.id,
  uploaded: image.uploaded,
  checksum: image.checksum,
  sizeInBytes: image.sizeInBytes,
  lastModified: image.lastModified,
  sourceFilePath: image.sourceFilePath,
});
