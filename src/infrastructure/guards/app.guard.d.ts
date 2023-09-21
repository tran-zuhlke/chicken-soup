import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectAuthorizationGuard } from './project-authorization.guard';
export declare class AppGuard implements CanActivate {
    private reflector;
    private authorizationGuard;
    constructor(reflector: Reflector, authorizationGuard: ProjectAuthorizationGuard);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
