import { Image, mapImageFromDbEntity, mapImageToResponse } from './Image';
import { UploadDbEntity as UploadDbEntity } from '../persistence/upload.entity';
import { UploadStatus } from './UploadStatus';
import { UploadResponse } from '../application/projects/dtos/upload.response';

export interface Upload {
  id: string;
  status: UploadStatus;
  images: Image[];
}

export const mapUploadFromDbEntity = (uploadDbEntity: UploadDbEntity): Upload => ({
  id: uploadDbEntity.id.toString(),
  status: UploadStatus[uploadDbEntity.status],
  images: uploadDbEntity.images?.map((image) => mapImageFromDbEntity(image)) ?? [],
});

export const mapUploadToResponse = (upload: Upload): UploadResponse => ({
  id: upload.id,
  status: upload.status,
  images: upload.images.map((i) => mapImageToResponse(i)),
});
