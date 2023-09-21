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
var UploadImagesUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImagesUseCase = void 0;
const common_1 = require("@nestjs/common");
const generateChecksum_1 = require("../../validation/generateChecksum");
const ValidationException_1 = require("../../../exceptions/ValidationException");
const path = require("path");
const fs = require("fs");
const get_project_use_case_1 = require("../get-project.use-case");
const Image_1 = require("../../../../domain/Image");
const typeorm_1 = require("@nestjs/typeorm");
const image_entity_1 = require("../../../../persistence/image.entity");
const typeorm_2 = require("typeorm");
const get_upload_use_case_1 = require("../get-upload.use-case");
let UploadImagesUseCase = UploadImagesUseCase_1 = class UploadImagesUseCase {
    constructor(getProjectUseCase, getUploadUseCase, imagesRepository) {
        this.getProjectUseCase = getProjectUseCase;
        this.getUploadUseCase = getUploadUseCase;
        this.imagesRepository = imagesRepository;
        this.logger = new common_1.Logger(UploadImagesUseCase_1.name);
        this.markImagesAsUploaded = async (images) => {
            const mappedImages = images.map((image) => (Object.assign(Object.assign({}, (0, Image_1.mapImageToDbEntity)(image)), { uploaded: true })));
            await this.imagesRepository.save(mappedImages);
            this.logger.log(`Marked ${images.length} images as uploaded in image metadata`);
        };
    }
    async invoke(projectId, uploadId, files) {
        const project = await this.getProjectUseCase.invokeWithRelations(projectId, []);
        const upload = await this.getUploadUseCase.invoke(projectId, uploadId);
        const writeFilePromises = [];
        const uploadedImagesMetadata = [];
        this.logger.log(`Uploading ${files.length} images for upload ${uploadId}`);
        for (const file of files) {
            const imageMetadata = upload.images.find((imageMetadata) => path.basename(imageMetadata.sourceFilePath) === file.originalname);
            if (!imageMetadata) {
                throw new Error(`No matching image metadata found for file ${file.originalname}`);
            }
            const generatedChecksum = (0, generateChecksum_1.generateChecksum)(file);
            if (generatedChecksum !== imageMetadata.checksum) {
                throw new ValidationException_1.ValidationException(`Checksum for file ${file.originalname} does not match. \n Checksum from metadata: ${imageMetadata.checksum} \n Generated checksum ${generatedChecksum}`);
            }
            const uploadFilePathDirectory = path.join(__dirname, '../../../../../uploads', project.destinationPath, path.dirname(imageMetadata.sourceFilePath));
            const targetDirectoryExists = fs.existsSync(uploadFilePathDirectory);
            if (!targetDirectoryExists) {
                this.logger.log(`Creating target directory ${uploadFilePathDirectory} for upload ${uploadId}`);
                await fs.promises.mkdir(uploadFilePathDirectory, { recursive: true });
            }
            writeFilePromises.push(fs.promises.writeFile(path.join(uploadFilePathDirectory, file.originalname), file.buffer).then(() => {
                uploadedImagesMetadata.push(imageMetadata);
                this.logger.log(`Successfully uploaded image ${file.originalname} for upload ${uploadId}`);
            }));
        }
        await Promise.all(writeFilePromises);
        this.logger.log(`Successfully uploaded ${files.length} images for upload ${uploadId}`);
        await this.markImagesAsUploaded(uploadedImagesMetadata);
    }
};
UploadImagesUseCase = UploadImagesUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(image_entity_1.ImageDbEntity)),
    __metadata("design:paramtypes", [get_project_use_case_1.GetProjectUseCase,
        get_upload_use_case_1.GetUploadUseCase,
        typeorm_2.Repository])
], UploadImagesUseCase);
exports.UploadImagesUseCase = UploadImagesUseCase;
//# sourceMappingURL=upload-images.use-case.js.map