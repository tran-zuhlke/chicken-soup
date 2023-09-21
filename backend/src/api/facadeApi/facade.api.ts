import { Injectable, Logger } from '@nestjs/common';
import {
  AuthorizationRequest,
  FacadeApiErrorResponse,
  NotifyProjectUploadCompletionRequest,
  NotifyProjectUploadCompletionResponse,
  ProjectDetailsResponse,
} from './facade-api.dtos';
import { ProjectDetails } from '../../application/projects/dtos/project-details.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ApiException } from '../api.exception';

@Injectable()
export class FacadeApi {
  public static readonly TENANT_ID_HEADER_KEY = 'x-tenant-id';

  private readonly logger = new Logger(FacadeApi.name);
  private readonly baseUrl = process.env.FACADE_API_BASE_URL;

  constructor(private readonly httpService: HttpService) {}

  async checkAuthorizationAndGetProjectDetails(
    projectUploadId: string,
    projectToken: string,
    tenantId: string
  ): Promise<ProjectDetails> {
    const url = `${this.baseUrl}/temp-login`;
    const request: AuthorizationRequest = {
      user: projectUploadId,
      password: projectToken,
    };
    this.logger.debug(
      `Calling ${url} to validate project token for uploadId ${projectUploadId} and tenantId ${tenantId}`
    );
    const { data: response } = await firstValueFrom(
      this.httpService
        .post<ProjectDetailsResponse>(url, request, {
          headers: this.getDefaultRequestHeaders(tenantId),
        })
        .pipe(catchError(this.handleError(url)))
    );
    this.logger.debug(`Project token validation for uploadId ${projectUploadId} was successful`);
    return this.mapToProjectDetails(response, tenantId);
  }

  async notifyProjectUploadCompletion(propertyId: string, projectId: string, tenantId: string): Promise<string> {
    const url = `${this.baseUrl}/notify-image-upload`;
    const request: NotifyProjectUploadCompletionRequest = {
      blockId: propertyId,
      batchId: projectId,
    };
    this.logger.log(
      `Calling ${url} to notifying project upload completion for project ${projectId} and tenantId ${tenantId}`
    );
    const { data: response } = await firstValueFrom(
      this.httpService
        .post<NotifyProjectUploadCompletionResponse>(url, request, {
          headers: this.getDefaultRequestHeaders(tenantId),
        })
        .pipe(catchError(this.handleError(url)))
    );
    this.logger.log(
      `Successfully notified project upload completion for project ${projectId} and tenantId ${tenantId}. Message: ${response.message}`
    );
    return response.message;
  }

  private handleError(url: string) {
    return (error: AxiosError) => {
      let errorMessage = `Received error calling ${url}: ${error.message}`;
      if (this.isFacadeApiErrorResponse(error.response.data)) {
        errorMessage = (error.response.data as FacadeApiErrorResponse).message.error;
      }
      this.logger.error(`Received error response calling ${url}: ${errorMessage}`);
      throw new ApiException(error.status, errorMessage);
    };
  }

  private getDefaultRequestHeaders(tenantId: string) {
    return {
      'Content-Type': 'application/json',
      [FacadeApi.TENANT_ID_HEADER_KEY]: tenantId,
    };
  }

  private mapToProjectDetails(dto: ProjectDetailsResponse, tenantId: string): ProjectDetails {
    return {
      companyName: dto.message.companyName,
      propertyId: dto.message.blockId,
      projectId: dto.message.batchId,
      tenantId: tenantId,
    };
  }

  private isFacadeApiErrorResponse(errorData: unknown): errorData is FacadeApiErrorResponse {
    return (
      (errorData as FacadeApiErrorResponse).message !== undefined &&
      (errorData as FacadeApiErrorResponse).message.error !== undefined
    );
  }
}
