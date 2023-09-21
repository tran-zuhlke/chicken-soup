import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectDbEntity } from './project.entity';
import { ImageDbEntity } from './image.entity';

export const UPLOADS_TABLE_NAME = 'Uploads';

@Entity(UPLOADS_TABLE_NAME)
export class UploadDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => ProjectDbEntity, (project) => project.uploads)
  project: ProjectDbEntity;

  @OneToMany(() => ImageDbEntity, (image) => image.upload)
  images: ImageDbEntity[];
}
