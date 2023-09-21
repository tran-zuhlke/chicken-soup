"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProjectAuthorizationGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const check_project_authorization_use_case_1 = require("../../application/projects/usecase/check-project-authorization.use-case");
let ProjectAuthorizationGuard = ProjectAuthorizationGuard_1 = class ProjectAuthorizationGuard {
    constructor(reflector, checkProjectAuthorizationUseCase) {
        this.reflector = reflector;
        this.checkProjectAuthorizationUseCase = checkProjectAuthorizationUseCase;
        this.logger = new common_1.Logger(ProjectAuthorizationGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const projectUploadId = request.headers[ProjectAuthorizationGuard_1.PROJECT_UPLOAD_ID_HEADER];
        const projectToken = request.headers[ProjectAuthorizationGuard_1.PROJECT_TOKEN_HEADER];
        const tenantId = request.headers[ProjectAuthorizationGuard_1.TENANT_ID_HEADER];
        if (!projectToken || !projectUploadId || !tenantId) {
            this.logger.debug('Missing authorization data in request');
            return false;
        }
        try {
            await this.checkProjectAuthorizationUseCase.invoke(projectUploadId, projectToken, tenantId);
            return true;
        }
        catch (e) {
            this.logger.warn(`Authorization check failed: ${e}`);
            throw e;
        }
    }
};
ProjectAuthorizationGuard.PROJECT_UPLOAD_ID_HEADER = 'project-upload-id';
ProjectAuthorizationGuard.PROJECT_TOKEN_HEADER = 'project-token';
ProjectAuthorizationGuard.TENANT_ID_HEADER = 'tenant-id';
ProjectAuthorizationGuard = ProjectAuthorizationGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        check_project_authorization_use_case_1.CheckProjectAuthorizationUseCase])
], ProjectAuthorizationGuard);
exports.ProjectAuthorizationGuard = ProjectAuthorizationGuard;
//# sourceMappingURL=project-authorization.guard.js.map