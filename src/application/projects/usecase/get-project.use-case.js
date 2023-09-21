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
var GetProjectUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProjectUseCase = void 0;
const common_1 = require("@nestjs/common");
const Project_1 = require("../../../domain/Project");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("../../../persistence/project.entity");
const typeorm_2 = require("typeorm");
let GetProjectUseCase = GetProjectUseCase_1 = class GetProjectUseCase {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
        this.logger = new common_1.Logger(GetProjectUseCase_1.name);
    }
    async invoke(projectId) {
        this.logger.debug(`Invoked ${GetProjectUseCase_1.name} for projectId ${projectId}`);
        return await this.invokeWithRelations(projectId, ['uploads', 'uploads.images']);
    }
    async invokeWithRelations(projectId, relations) {
        const projectDbEntity = await this.projectsRepository.findOne({
            where: { id: projectId },
            relations: relations,
        });
        if (!projectDbEntity) {
            throw new common_1.NotFoundException('Project not found');
        }
        return (0, Project_1.mapProjectFromDbEntity)(projectDbEntity);
    }
};
GetProjectUseCase = GetProjectUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectDbEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GetProjectUseCase);
exports.GetProjectUseCase = GetProjectUseCase;
//# sourceMappingURL=get-project.use-case.js.map