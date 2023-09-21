import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectAuthorizationGuard } from './project-authorization.guard';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private reflector: Reflector, private authorizationGuard: ProjectAuthorizationGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.authorizationGuard.canActivate(context);
  }
}
