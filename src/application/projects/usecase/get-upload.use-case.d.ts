import { Upload } from '../../../domain/Upload';
import { DataSource } from 'typeorm';
export declare class GetUploadUseCase {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    invoke(projectId: string, uploadId: number): Promise<Upload>;
}
