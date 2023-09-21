import { ProjectDetails } from '../dtos/project-details.dto';
import { FacadeApi } from '../../../api/facadeApi/facade.api';
export declare class CheckProjectAuthorizationUseCase {
    private readonly facadeApi;
    private readonly logger;
    constructor(facadeApi: FacadeApi);
    invoke(projectUploadId: string, projectToken: string, tenantId: string): Promise<ProjectDetails>;
}
