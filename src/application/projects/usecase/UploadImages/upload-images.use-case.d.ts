/// <reference types="multer" />
import { GetProjectUseCase } from '../get-project.use-case';
import { ImageDbEntity } from '../../../../persistence/image.entity';
import { Repository } from 'typeorm';
import { GetUploadUseCase } from '../get-upload.use-case';
export declare class UploadImagesUseCase {
    private getProjectUseCase;
    private getUploadUseCase;
    private imagesRepository;
    private readonly logger;
    constructor(getProjectUseCase: GetProjectUseCase, getUploadUseCase: GetUploadUseCase, imagesRepository: Repository<ImageDbEntity>);
    invoke(projectId: string, uploadId: number, files: Array<Express.Multer.File>): Promise<void>;
    private markImagesAsUploaded;
}
