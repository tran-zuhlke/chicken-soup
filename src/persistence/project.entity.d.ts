import { UploadDbEntity } from './upload.entity';
export declare const PROJECTS_TABLE_NAME = "Projects";
export declare class ProjectDbEntity {
    id: string;
    tenantId: string;
    propertyId: string;
    companyName: string;
    destinationPath: string;
    uploads: UploadDbEntity[];
}
