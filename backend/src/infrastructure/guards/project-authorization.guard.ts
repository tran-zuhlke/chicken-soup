import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CheckProjectAuthorizationUseCase } from '../../application/projects/usecase/check-project-authorization.use-case';

@Injectable()
export class ProjectAuthorizationGuard implements CanActivate {
  public static readonly PROJECT_UPLOAD_ID_HEADER = 'project-upload-id';
  public static readonly PROJECT_TOKEN_HEADER = 'project-token';
  public static readonly TENANT_ID_HEADER = 'tenant-id';

  private readonly logger = new Logger(ProjectAuthorizationGuard.name);

  constructor(
    private reflector: Reflector,
    private checkProjectAuthorizationUseCase: CheckProjectAuthorizationUseCase
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const projectUploadId = request.headers[ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER];
    const projectToken = request.headers[ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER];
    const tenantId = request.headers[ProjectAuthorizationGuard.TENANT_ID_HEADER];

    if (!projectToken || !projectUploadId || !tenantId) {
      this.logger.debug('Missing authorization data in request');
      return false;
    }

    try {
      await this.checkProjectAuthorizationUseCase.invoke(projectUploadId, projectToken, tenantId);
      return true;
    } catch (e) {
      this.logger.warn(`Authorization check failed: ${e}`);
      throw e;
    }
  }
}
