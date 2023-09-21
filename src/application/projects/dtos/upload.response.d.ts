import { UploadStatus } from '../../../domain/UploadStatus';
import { ImageResponse } from './image.response';
export declare class UploadResponse {
    id: string;
    status: UploadStatus;
    images: ImageResponse[];
}
