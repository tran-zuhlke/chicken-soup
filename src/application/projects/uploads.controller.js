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
var UploadsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const Upload_1 = require("../../domain/Upload");
const update_upload_request_1 = require("./dtos/update-upload.request");
const create_upload_request_1 = require("./dtos/create-upload.request");
const convertMegabyteToByte_1 = require("../utils/convertMegabyteToByte");
const constants_1 = require("./validation/constants");
const create_upload_use_case_1 = require("./usecase/create-upload.use-case");
const update_upload_status_use_case_1 = require("./usecase/update-upload-status.use-case");
const upload_images_use_case_1 = require("./usecase/UploadImages/upload-images.use-case");
const update_image_checksum_use_case_service_1 = require("./usecase/update-image-checksum.use-case.service");
const swagger_1 = require("@nestjs/swagger");
const upload_response_1 = require("./dtos/upload.response");
const files_upload_request_1 = require("./dtos/files-upload.request");
let UploadsController = UploadsController_1 = class UploadsController {
    constructor(createUploadUseCase, updateUploadStatusUseCase, uploadImagesUseCase, updateChecksumMetadataUseCase) {
        this.createUploadUseCase = createUploadUseCase;
        this.updateUploadStatusUseCase = updateUploadStatusUseCase;
        this.uploadImagesUseCase = uploadImagesUseCase;
        this.updateChecksumMetadataUseCase = updateChecksumMetadataUseCase;
        this.logger = new common_1.Logger(UploadsController_1.name);
    }
    async createUploadMetadata(projectId, requestBody) {
        this.logger.log(`Creating an upload for project ${projectId}`);
        const upload = await this.createUploadUseCase.invoke(projectId, {
            images: requestBody.uploadMetadata.images,
        });
        return (0, Upload_1.mapUploadToResponse)(upload);
    }
    async updateUpload(projectId, id, requestBody) {
        this.logger.log(`Updating upload ${id} for project ${projectId}`);
        const upload = await this.updateUploadStatusUseCase.invoke(projectId, id, requestBody.uploadStatus);
        return (0, Upload_1.mapUploadToResponse)(upload);
    }
    async uploadImages(projectId, id, files) {
        await this.uploadImagesUseCase.invoke(projectId, id, files);
        const uploadedFiles = files.map((file) => ({
            originalName: file.originalname,
            fileName: file.filename,
            destinationPath: file.path,
        }));
        return { uploadedFiles: uploadedFiles };
    }
    async updateChecksum(projectId, id, requestBody) {
        this.logger.log(`Updating checksum for upload ${id}`);
        const upload = await this.updateChecksumMetadataUseCase.invoke(id, requestBody.imagesChecksumMetadata);
        return (0, Upload_1.mapUploadToResponse)(upload);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: upload_response_1.UploadResponse }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_upload_request_1.CreateUploadRequest]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "createUploadMetadata", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: upload_response_1.UploadResponse }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, update_upload_request_1.UpdateUploadRequest]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "updateUpload", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: files_upload_request_1.FilesUploadDto }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: (0, convertMegabyteToByte_1.convertMegabyteToByte)(constants_1.MAX_FILE_SIZE_IN_MB) }),
            new common_1.FileTypeValidator({ fileType: constants_1.ACCEPTED_FILE_TYPE }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Array]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Put)(':id/imagesChecksum'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "updateChecksum", null);
UploadsController = UploadsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Uploads'),
    (0, common_1.Controller)('/projects/:projectId/uploads'),
    __metadata("design:paramtypes", [create_upload_use_case_1.CreateUploadUseCase,
        update_upload_status_use_case_1.UpdateUploadStatusUseCase,
        upload_images_use_case_1.UploadImagesUseCase,
        update_image_checksum_use_case_service_1.UpdateImageChecksumUseCase])
], UploadsController);
exports.UploadsController = UploadsController;
//# sourceMappingURL=uploads.controller.js.map