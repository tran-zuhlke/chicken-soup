import { ProjectDetails } from './dtos/project-details.dto';
import { CheckProjectAuthorizationRequest } from './dtos/check-project-authorization.request';
import { CreateProjectRequest } from './dtos/create-project.request';
import { CreateProjectUseCase } from './usecase/create-project.use-case';
import { GetProjectUseCase } from './usecase/get-project.use-case';
import { CheckProjectAuthorizationUseCase } from './usecase/check-project-authorization.use-case';
import { NotifyProjectUploadCompletionUseCase } from './usecase/notify-project-upload-completion.use-case';
import { ProjectResponse } from './dtos/project.response';
export declare class ProjectsController {
    private createProjectUseCase;
    private getProjectUseCase;
    private checkProjectAuthorizationUseCase;
    private notifyProjectUploadCompletionUseCase;
    private readonly logger;
    constructor(createProjectUseCase: CreateProjectUseCase, getProjectUseCase: GetProjectUseCase, checkProjectAuthorizationUseCase: CheckProjectAuthorizationUseCase, notifyProjectUploadCompletionUseCase: NotifyProjectUploadCompletionUseCase);
    createProject(requestBody: CreateProjectRequest): Promise<ProjectResponse>;
    getProject(id: string): Promise<ProjectResponse>;
    checkAuthorizationAndGetProjectDetails(request: CheckProjectAuthorizationRequest): Promise<ProjectDetails>;
    completeProjectUpload(id: string): Promise<ProjectResponse>;
}
