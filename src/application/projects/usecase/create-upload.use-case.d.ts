import { DataSource } from 'typeorm';
import { UploadMetadata } from '../types/UploadMetadata';
import { Upload } from '../../../domain/Upload';
export declare class CreateUploadUseCase {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    invoke(projectId: string, uploadMetadata: UploadMetadata): Promise<Upload>;
}
