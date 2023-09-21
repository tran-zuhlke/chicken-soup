import { ProjectDbEntity } from './project.entity';
import { ImageDbEntity } from './image.entity';
export declare const UPLOADS_TABLE_NAME = "Uploads";
export declare class UploadDbEntity {
    id: number;
    status: string;
    project: ProjectDbEntity;
    images: ImageDbEntity[];
}
