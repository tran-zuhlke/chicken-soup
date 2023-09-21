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
var NotifyProjectUploadCompletionUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyProjectUploadCompletionUseCase = void 0;
const common_1 = require("@nestjs/common");
const facade_api_1 = require("../../../api/facadeApi/facade.api");
const get_project_use_case_1 = require("./get-project.use-case");
let NotifyProjectUploadCompletionUseCase = NotifyProjectUploadCompletionUseCase_1 = class NotifyProjectUploadCompletionUseCase {
    constructor(facadeApi, getProjectUseCase) {
        this.facadeApi = facadeApi;
        this.getProjectUseCase = getProjectUseCase;
        this.logger = new common_1.Logger(NotifyProjectUploadCompletionUseCase_1.name);
    }
    async invoke(projectId) {
        this.logger.debug(`Invoked ${NotifyProjectUploadCompletionUseCase_1.name} for projectId ${projectId}`);
        const project = await this.getProjectUseCase.invoke(projectId);
        if (!project) {
            throw new common_1.NotFoundException(`Project with id ${projectId} not found`);
        }
        await this.facadeApi.notifyProjectUploadCompletion(project.propertyId, projectId, project.tenantId);
        return project;
    }
};
NotifyProjectUploadCompletionUseCase = NotifyProjectUploadCompletionUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [facade_api_1.FacadeApi, get_project_use_case_1.GetProjectUseCase])
], NotifyProjectUploadCompletionUseCase);
exports.NotifyProjectUploadCompletionUseCase = NotifyProjectUploadCompletionUseCase;
//# sourceMappingURL=notify-project-upload-completion.use-case.js.map