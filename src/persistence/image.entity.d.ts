import { UploadDbEntity } from './upload.entity';
export declare const IMAGES_TABLE_NAME = "Images";
export declare class ImageDbEntity {
    id: number;
    sourceFilePath: string;
    sizeInBytes: number;
    lastModified: string;
    uploaded: boolean;
    checksum: string;
    upload: UploadDbEntity;
}
