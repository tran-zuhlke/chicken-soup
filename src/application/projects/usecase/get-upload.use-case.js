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
var GetUploadUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUploadUseCase = void 0;
const common_1 = require("@nestjs/common");
const Upload_1 = require("../../../domain/Upload");
const upload_entity_1 = require("../../../persistence/upload.entity");
const typeorm_1 = require("typeorm");
let GetUploadUseCase = GetUploadUseCase_1 = class GetUploadUseCase {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(GetUploadUseCase_1.name);
    }
    async invoke(projectId, uploadId) {
        this.logger.debug(`Invoked ${GetUploadUseCase_1.name} for projectId ${projectId} and uploadId: ${uploadId}`);
        const upload = await this.dataSource.transaction(async (transactionalEntityManager) => {
            const upload = await transactionalEntityManager.findOne(upload_entity_1.UploadDbEntity, {
                where: { id: uploadId },
                relations: ['images'],
            });
            if (!upload) {
                throw new common_1.NotFoundException(`Upload with id ${uploadId} not found`);
            }
            return upload;
        });
        return (0, Upload_1.mapUploadFromDbEntity)(upload);
    }
};
GetUploadUseCase = GetUploadUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], GetUploadUseCase);
exports.GetUploadUseCase = GetUploadUseCase;
//# sourceMappingURL=get-upload.use-case.js.map