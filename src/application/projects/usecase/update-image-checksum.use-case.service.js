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
var UpdateImageChecksumUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateImageChecksumUseCase = void 0;
const common_1 = require("@nestjs/common");
const Upload_1 = require("../../../domain/Upload");
const upload_entity_1 = require("../../../persistence/upload.entity");
const typeorm_1 = require("typeorm");
const image_entity_1 = require("../../../persistence/image.entity");
let UpdateImageChecksumUseCase = UpdateImageChecksumUseCase_1 = class UpdateImageChecksumUseCase {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(UpdateImageChecksumUseCase_1.name);
    }
    async invoke(uploadId, imagesChecksumMetadata) {
        return await this.dataSource.transaction(async (transactionalEntityManager) => {
            const checksumMap = imagesChecksumMetadata.reduce(function (map, obj) {
                map[obj.sourceFilePath] = obj.checksum;
                return map;
            }, {});
            const images = await transactionalEntityManager.findBy(image_entity_1.ImageDbEntity, {
                sourceFilePath: (0, typeorm_1.In)(Object.keys(checksumMap)),
                upload: { id: uploadId },
            });
            for (const image of images) {
                image.checksum = checksumMap[image.sourceFilePath];
            }
            await transactionalEntityManager.save(image_entity_1.ImageDbEntity, images);
            this.logger.log(`Updated images checksum metadata for upload ${uploadId}`);
            const updatedUpload = await transactionalEntityManager.findOne(upload_entity_1.UploadDbEntity, {
                where: { id: uploadId },
                relations: ['images'],
            });
            return (0, Upload_1.mapUploadFromDbEntity)(updatedUpload);
        });
    }
};
UpdateImageChecksumUseCase = UpdateImageChecksumUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UpdateImageChecksumUseCase);
exports.UpdateImageChecksumUseCase = UpdateImageChecksumUseCase;
//# sourceMappingURL=update-image-checksum.use-case.service.js.map