import { DataSource } from 'typeorm';
import { ProjectDbEntity } from '../persistence/project.entity';
import { UploadDbEntity } from '../persistence/upload.entity';
import { ImageDbEntity } from '../persistence/image.entity';
export declare const projects: ProjectDbEntity[];
export declare const uploads: UploadDbEntity[];
export declare const images: ImageDbEntity[];
export declare const seedTestData: (dataSource: DataSource) => Promise<void>;
