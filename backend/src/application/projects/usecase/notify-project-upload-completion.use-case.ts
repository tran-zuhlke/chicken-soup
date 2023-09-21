import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Project } from '../../../domain/Project';
import { FacadeApi } from '../../../api/facadeApi/facade.api';
import { GetProjectUseCase } from './get-project.use-case';

@Injectable()
export class NotifyProjectUploadCompletionUseCase {
  private readonly logger = new Logger(NotifyProjectUploadCompletionUseCase.name);

  constructor(private readonly facadeApi: FacadeApi, private getProjectUseCase: GetProjectUseCase) {}

  async invoke(projectId): Promise<Project> {
    this.logger.debug(`Invoked ${NotifyProjectUploadCompletionUseCase.name} for projectId ${projectId}`);
    const project = await this.getProjectUseCase.invoke(projectId);
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }
    await this.facadeApi.notifyProjectUploadCompletion(project.propertyId, projectId, project.tenantId);
    return project;
  }
}
