import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { mapToProjectResponse } from '../../domain/Project';
import { ProjectDetails } from './dtos/project-details.dto';
import { CheckProjectAuthorizationRequest } from './dtos/check-project-authorization.request';
import { CreateProjectRequest } from './dtos/create-project.request';
import { CreateProjectUseCase } from './usecase/create-project.use-case';
import { GetProjectUseCase } from './usecase/get-project.use-case';
import { CheckProjectAuthorizationUseCase } from './usecase/check-project-authorization.use-case';
import { NotifyProjectUploadCompletionUseCase } from './usecase/notify-project-upload-completion.use-case';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponse } from './dtos/project.response';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private getProjectUseCase: GetProjectUseCase,
    private checkProjectAuthorizationUseCase: CheckProjectAuthorizationUseCase,
    private notifyProjectUploadCompletionUseCase: NotifyProjectUploadCompletionUseCase
  ) {}

  @Post()
  @ApiOkResponse({ type: ProjectResponse })
  async createProject(@Body() requestBody: CreateProjectRequest): Promise<ProjectResponse> {
    this.logger.log(`Creating new project with id ${requestBody.projectId}`);
    const project = await this.createProjectUseCase.invoke(
      requestBody.projectId,
      requestBody.tenantId,
      requestBody.propertyId,
      requestBody.companyName,
      requestBody.destinationPath
    );
    return mapToProjectResponse(project);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProjectResponse })
  async getProject(@Param('id') id: string): Promise<ProjectResponse> {
    this.logger.log(`Retrieving project ${id}`);
    const project = await this.getProjectUseCase.invoke(id);
    return mapToProjectResponse(project);
  }

  @Post('authorization')
  @ApiOkResponse({ type: ProjectDetails })
  async checkAuthorizationAndGetProjectDetails(
    @Body() request: CheckProjectAuthorizationRequest
  ): Promise<ProjectDetails> {
    this.logger.log(`Checking authorization for project upload id ${request.projectUploadId}`);
    return await this.checkProjectAuthorizationUseCase.invoke(
      request.projectUploadId,
      request.projectToken,
      request.tenantId
    );
  }

  @Get(':id/complete')
  @ApiOkResponse({ type: ProjectResponse })
  async completeProjectUpload(@Param('id') id: string): Promise<ProjectResponse> {
    this.logger.log(`Notifying project upload completion for project ${id}`);
    const project = await this.notifyProjectUploadCompletionUseCase.invoke(id);
    return mapToProjectResponse(project);
  }
}
