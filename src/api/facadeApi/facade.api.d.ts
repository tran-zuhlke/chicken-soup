import { ProjectDetails } from '../../application/projects/dtos/project-details.dto';
import { HttpService } from '@nestjs/axios';
export declare class FacadeApi {
    private readonly httpService;
    static readonly TENANT_ID_HEADER_KEY = "x-tenant-id";
    private readonly logger;
    private readonly baseUrl;
    constructor(httpService: HttpService);
    checkAuthorizationAndGetProjectDetails(projectUploadId: string, projectToken: string, tenantId: string): Promise<ProjectDetails>;
    notifyProjectUploadCompletion(propertyId: string, projectId: string, tenantId: string): Promise<string>;
    private handleError;
    private getDefaultRequestHeaders;
    private mapToProjectDetails;
    private isFacadeApiErrorResponse;
}
