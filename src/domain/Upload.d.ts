import { Image } from './Image';
import { UploadDbEntity as UploadDbEntity } from '../persistence/upload.entity';
import { UploadStatus } from './UploadStatus';
import { UploadResponse } from '../application/projects/dtos/upload.response';
export interface Upload {
    id: string;
    status: UploadStatus;
    images: Image[];
}
export declare const mapUploadFromDbEntity: (uploadDbEntity: UploadDbEntity) => Upload;
export declare const mapUploadToResponse: (upload: Upload) => UploadResponse;
