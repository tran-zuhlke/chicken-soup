"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("../../persistence/project.entity");
const image_entity_1 = require("../../persistence/image.entity");
const upload_entity_1 = require("../../persistence/upload.entity");
const projects_controller_1 = require("./projects.controller");
const facade_api_1 = require("../../api/facadeApi/facade.api");
const axios_1 = require("@nestjs/axios");
const uploads_controller_1 = require("./uploads.controller");
const create_project_use_case_1 = require("./usecase/create-project.use-case");
const create_upload_use_case_1 = require("./usecase/create-upload.use-case");
const get_project_use_case_1 = require("./usecase/get-project.use-case");
const check_project_authorization_use_case_1 = require("./usecase/check-project-authorization.use-case");
const update_upload_status_use_case_1 = require("./usecase/update-upload-status.use-case");
const upload_images_use_case_1 = require("./usecase/UploadImages/upload-images.use-case");
const get_upload_use_case_1 = require("./usecase/get-upload.use-case");
const notify_project_upload_completion_use_case_1 = require("./usecase/notify-project-upload-completion.use-case");
const update_image_checksum_use_case_service_1 = require("./usecase/update-image-checksum.use-case.service");
const test_controller_1 = require("./test.controller");
let ProjectsModule = class ProjectsModule {
};
ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectDbEntity, image_entity_1.ImageDbEntity, upload_entity_1.UploadDbEntity]), axios_1.HttpModule],
        controllers: [projects_controller_1.ProjectsController, uploads_controller_1.UploadsController, test_controller_1.TestController],
        providers: [
            create_project_use_case_1.CreateProjectUseCase,
            create_upload_use_case_1.CreateUploadUseCase,
            get_project_use_case_1.GetProjectUseCase,
            check_project_authorization_use_case_1.CheckProjectAuthorizationUseCase,
            update_upload_status_use_case_1.UpdateUploadStatusUseCase,
            upload_images_use_case_1.UploadImagesUseCase,
            get_upload_use_case_1.GetUploadUseCase,
            update_image_checksum_use_case_service_1.UpdateImageChecksumUseCase,
            notify_project_upload_completion_use_case_1.NotifyProjectUploadCompletionUseCase,
            facade_api_1.FacadeApi,
        ],
        exports: [check_project_authorization_use_case_1.CheckProjectAuthorizationUseCase],
    })
], ProjectsModule);
exports.ProjectsModule = ProjectsModule;
//# sourceMappingURL=projects.module.js.map