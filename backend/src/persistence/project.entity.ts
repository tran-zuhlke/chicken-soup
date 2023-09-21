import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UploadDbEntity } from './upload.entity';

export const PROJECTS_TABLE_NAME = 'Projects';

@Entity(PROJECTS_TABLE_NAME)
export class ProjectDbEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  tenantId: string;

  @Column()
  propertyId: string;

  @Column()
  companyName: string;

  @Column()
  destinationPath: string;

  @OneToMany(() => UploadDbEntity, (uploadSlice) => uploadSlice.project)
  uploads: UploadDbEntity[];
}
