import { Injectable, Logger } from '@nestjs/common';
import { ProjectDetails } from '../dtos/project-details.dto';
import { FacadeApi } from '../../../api/facadeApi/facade.api';

@Injectable()
export class CheckProjectAuthorizationUseCase {
  private readonly logger = new Logger(CheckProjectAuthorizationUseCase.name);

  constructor(private readonly facadeApi: FacadeApi) {}

  async invoke(projectUploadId: string, projectToken: string, tenantId: string): Promise<ProjectDetails> {
    const projectDetails = await this.facadeApi.checkAuthorizationAndGetProjectDetails(
      projectUploadId,
      projectToken,
      tenantId
    );
    this.logger.log(`Authorization for project ${projectDetails.projectId} succeeded`);
    return projectDetails;
  }
}
