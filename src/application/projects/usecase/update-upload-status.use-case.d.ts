import { UploadStatus } from '../../../domain/UploadStatus';
import { Upload } from '../../../domain/Upload';
import { DataSource } from 'typeorm';
export declare class UpdateUploadStatusUseCase {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    invoke(projectId: string, uploadId: number, uploadStatus: UploadStatus): Promise<Upload>;
}
