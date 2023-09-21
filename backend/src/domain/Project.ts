import { ProjectDbEntity as ProjectDbEntity } from '../persistence/project.entity';
import { mapUploadFromDbEntity, mapUploadToResponse, Upload } from './Upload';
import { ProjectResponse } from '../application/projects/dtos/project.response';

export interface Project {
  id: string;
  tenantId: string;
  propertyId: string;
  companyName: string;
  destinationPath: string;
  uploads: Upload[];
}

export const mapProjectFromDbEntity = (projectDbEntity: ProjectDbEntity): Project => ({
  id: projectDbEntity.id.toString(),
  tenantId: projectDbEntity.tenantId,
  propertyId: projectDbEntity.propertyId,
  companyName: projectDbEntity.companyName,
  destinationPath: projectDbEntity.destinationPath.toString(),
  uploads: projectDbEntity.uploads?.map((uploadDbEntity) => mapUploadFromDbEntity(uploadDbEntity)) ?? [],
});

export const mapToProjectResponse = (project: Project): ProjectResponse => ({
  id: project.id,
  tenantId: project.tenantId,
  propertyId: project.propertyId,
  companyName: project.companyName,
  destinationPath: project.destinationPath,
  uploads: project.uploads.map((u) => mapUploadToResponse(u)),
});
