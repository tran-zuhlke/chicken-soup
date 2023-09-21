import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CheckProjectAuthorizationUseCase } from '../../application/projects/usecase/check-project-authorization.use-case';
export declare class ProjectAuthorizationGuard implements CanActivate {
    private reflector;
    private checkProjectAuthorizationUseCase;
    static readonly PROJECT_UPLOAD_ID_HEADER = "project-upload-id";
    static readonly PROJECT_TOKEN_HEADER = "project-token";
    static readonly TENANT_ID_HEADER = "tenant-id";
    private readonly logger;
    constructor(reflector: Reflector, checkProjectAuthorizationUseCase: CheckProjectAuthorizationUseCase);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
