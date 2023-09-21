import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UploadDbEntity } from './upload.entity';

export const IMAGES_TABLE_NAME = 'Images';

@Entity(IMAGES_TABLE_NAME)
export class ImageDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceFilePath: string;

  @Column()
  sizeInBytes: number;

  @Column()
  lastModified: string;

  @Column()
  uploaded: boolean;

  @Column()
  checksum: string;

  @ManyToOne(() => UploadDbEntity, (upload) => upload.images)
  upload: UploadDbEntity;
}
