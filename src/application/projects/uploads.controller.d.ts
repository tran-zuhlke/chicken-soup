/// <reference types="multer" />
import { UpdateUploadRequest } from './dtos/update-upload.request';
import { CreateUploadRequest } from './dtos/create-upload.request';
import { UpdateChecksumRequest } from './dtos/update-checksum.request';
import { UploadImagesResponse } from './dtos/upload-images.response';
import { CreateUploadUseCase } from './usecase/create-upload.use-case';
import { UpdateUploadStatusUseCase } from './usecase/update-upload-status.use-case';
import { UploadImagesUseCase } from './usecase/UploadImages/upload-images.use-case';
import { UpdateImageChecksumUseCase } from './usecase/update-image-checksum.use-case.service';
import { UploadResponse } from './dtos/upload.response';
export declare class UploadsController {
    private createUploadUseCase;
    private updateUploadStatusUseCase;
    private uploadImagesUseCase;
    private updateChecksumMetadataUseCase;
    private readonly logger;
    constructor(createUploadUseCase: CreateUploadUseCase, updateUploadStatusUseCase: UpdateUploadStatusUseCase, uploadImagesUseCase: UploadImagesUseCase, updateChecksumMetadataUseCase: UpdateImageChecksumUseCase);
    createUploadMetadata(projectId: string, requestBody: CreateUploadRequest): Promise<UploadResponse>;
    updateUpload(projectId: string, id: number, requestBody: UpdateUploadRequest): Promise<UploadResponse>;
    uploadImages(projectId: string, id: number, files: Array<Express.Multer.File>): Promise<UploadImagesResponse>;
    updateChecksum(projectId: string, id: number, requestBody: UpdateChecksumRequest): Promise<UploadResponse>;
}
