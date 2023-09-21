import { ProjectDbEntity as ProjectDbEntity } from '../persistence/project.entity';
import { Upload } from './Upload';
import { ProjectResponse } from '../application/projects/dtos/project.response';
export interface Project {
    id: string;
    tenantId: string;
    propertyId: string;
    companyName: string;
    destinationPath: string;
    uploads: Upload[];
}
export declare const mapProjectFromDbEntity: (projectDbEntity: ProjectDbEntity) => Project;
export declare const mapToProjectResponse: (project: Project) => ProjectResponse;
