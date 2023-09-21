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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProjectsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const Project_1 = require("../../domain/Project");
const project_details_dto_1 = require("./dtos/project-details.dto");
const check_project_authorization_request_1 = require("./dtos/check-project-authorization.request");
const create_project_request_1 = require("./dtos/create-project.request");
const create_project_use_case_1 = require("./usecase/create-project.use-case");
const get_project_use_case_1 = require("./usecase/get-project.use-case");
const check_project_authorization_use_case_1 = require("./usecase/check-project-authorization.use-case");
const notify_project_upload_completion_use_case_1 = require("./usecase/notify-project-upload-completion.use-case");
const swagger_1 = require("@nestjs/swagger");
const project_response_1 = require("./dtos/project.response");
let ProjectsController = ProjectsController_1 = class ProjectsController {
    constructor(createProjectUseCase, getProjectUseCase, checkProjectAuthorizationUseCase, notifyProjectUploadCompletionUseCase) {
        this.createProjectUseCase = createProjectUseCase;
        this.getProjectUseCase = getProjectUseCase;
        this.checkProjectAuthorizationUseCase = checkProjectAuthorizationUseCase;
        this.notifyProjectUploadCompletionUseCase = notifyProjectUploadCompletionUseCase;
        this.logger = new common_1.Logger(ProjectsController_1.name);
    }
    async createProject(requestBody) {
        this.logger.log(`Creating new project with id ${requestBody.projectId}`);
        const project = await this.createProjectUseCase.invoke(requestBody.projectId, requestBody.tenantId, requestBody.propertyId, requestBody.companyName, requestBody.destinationPath);
        return (0, Project_1.mapToProjectResponse)(project);
    }
    async getProject(id) {
        this.logger.log(`Retrieving project ${id}`);
        const project = await this.getProjectUseCase.invoke(id);
        return (0, Project_1.mapToProjectResponse)(project);
    }
    async checkAuthorizationAndGetProjectDetails(request) {
        this.logger.log(`Checking authorization for project upload id ${request.projectUploadId}`);
        return await this.checkProjectAuthorizationUseCase.invoke(request.projectUploadId, request.projectToken, request.tenantId);
    }
    async completeProjectUpload(id) {
        this.logger.log(`Notifying project upload completion for project ${id}`);
        const project = await this.notifyProjectUploadCompletionUseCase.invoke(id);
        return (0, Project_1.mapToProjectResponse)(project);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: project_response_1.ProjectResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_request_1.CreateProjectRequest]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: project_response_1.ProjectResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProject", null);
__decorate([
    (0, common_1.Post)('authorization'),
    (0, swagger_1.ApiOkResponse)({ type: project_details_dto_1.ProjectDetails }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_project_authorization_request_1.CheckProjectAuthorizationRequest]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "checkAuthorizationAndGetProjectDetails", null);
__decorate([
    (0, common_1.Get)(':id/complete'),
    (0, swagger_1.ApiOkResponse)({ type: project_response_1.ProjectResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "completeProjectUpload", null);
ProjectsController = ProjectsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [create_project_use_case_1.CreateProjectUseCase,
        get_project_use_case_1.GetProjectUseCase,
        check_project_authorization_use_case_1.CheckProjectAuthorizationUseCase,
        notify_project_upload_completion_use_case_1.NotifyProjectUploadCompletionUseCase])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map