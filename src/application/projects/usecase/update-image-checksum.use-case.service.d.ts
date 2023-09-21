import { Upload } from '../../../domain/Upload';
import { DataSource } from 'typeorm';
import { ImageChecksumMetadata } from '../types/UploadMetadata';
export declare class UpdateImageChecksumUseCase {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    invoke(uploadId: number, imagesChecksumMetadata: ImageChecksumMetadata[]): Promise<Upload>;
}
