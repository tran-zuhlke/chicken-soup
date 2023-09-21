import { UploadResponse } from './upload.response';
export declare class ProjectResponse {
    id: string;
    tenantId: string;
    propertyId: string;
    companyName: string;
    destinationPath: string;
    uploads: UploadResponse[];
}
