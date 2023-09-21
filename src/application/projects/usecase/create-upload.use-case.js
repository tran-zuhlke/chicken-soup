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
var CreateUploadUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUploadUseCase = void 0;
const common_1 = require("@nestjs/common");
const project_entity_1 = require("../../../persistence/project.entity");
const typeorm_1 = require("typeorm");
const Upload_1 = require("../../../domain/Upload");
const upload_entity_1 = require("../../../persistence/upload.entity");
const UploadStatus_1 = require("../../../domain/UploadStatus");
const image_entity_1 = require("../../../persistence/image.entity");
let CreateUploadUseCase = CreateUploadUseCase_1 = class CreateUploadUseCase {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(CreateUploadUseCase_1.name);
    }
    async invoke(projectId, uploadMetadata) {
        return await this.dataSource.transaction(async (transactionalEntityManager) => {
            let project = await transactionalEntityManager.findOne(project_entity_1.ProjectDbEntity, {
                where: { id: projectId },
                relations: ['uploads', 'uploads.images'],
            });
            if (!project) {
                project = await transactionalEntityManager.save(project_entity_1.ProjectDbEntity, {
                    id: projectId,
                    uploads: [],
                });
                this.logger.log(`Created new project ${projectId}`);
            }
            const newUpload = await transactionalEntityManager.save(upload_entity_1.UploadDbEntity, {
                status: UploadStatus_1.UploadStatus.NEW,
                project: project,
            });
            this.logger.log(`Created new upload with id ${newUpload.id} for project ${project.id}`);
            await transactionalEntityManager.save(image_entity_1.ImageDbEntity, uploadMetadata.images.map((image) => (Object.assign(Object.assign({}, image), { upload: newUpload, uploaded: false }))));
            const createdUpload = await transactionalEntityManager.findOne(upload_entity_1.UploadDbEntity, {
                where: { id: newUpload.id },
                relations: ['images'],
            });
            this.logger.log(`Saved image metadata for project ${projectId} and upload ${newUpload.id}`);
            return (0, Upload_1.mapUploadFromDbEntity)(createdUpload);
        });
    }
};
CreateUploadUseCase = CreateUploadUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CreateUploadUseCase);
exports.CreateUploadUseCase = CreateUploadUseCase;
//# sourceMappingURL=create-upload.use-case.js.map