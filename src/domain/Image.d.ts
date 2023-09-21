import { ImageDbEntity as ImageDbEntity } from '../persistence/image.entity';
import { ImageResponse } from '../application/projects/dtos/image.response';
export interface Image {
    id: string;
    sourceFilePath: string;
    checksum: string;
    sizeInBytes: number;
    lastModified: string;
    uploaded: boolean;
}
export declare const mapImageFromDbEntity: (imageDbEntity: ImageDbEntity) => Image;
export declare const mapImageToDbEntity: (image: Image) => ImageDbEntity;
export declare const mapImageToResponse: (image: Image) => ImageResponse;
