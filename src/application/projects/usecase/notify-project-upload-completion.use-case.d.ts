import { Project } from '../../../domain/Project';
import { FacadeApi } from '../../../api/facadeApi/facade.api';
import { GetProjectUseCase } from './get-project.use-case';
export declare class NotifyProjectUploadCompletionUseCase {
    private readonly facadeApi;
    private getProjectUseCase;
    private readonly logger;
    constructor(facadeApi: FacadeApi, getProjectUseCase: GetProjectUseCase);
    invoke(projectId: any): Promise<Project>;
}
