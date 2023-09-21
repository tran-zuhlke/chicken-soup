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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDbEntity = exports.PROJECTS_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const upload_entity_1 = require("./upload.entity");
exports.PROJECTS_TABLE_NAME = 'Projects';
let ProjectDbEntity = class ProjectDbEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ProjectDbEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectDbEntity.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectDbEntity.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectDbEntity.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectDbEntity.prototype, "destinationPath", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => upload_entity_1.UploadDbEntity, (uploadSlice) => uploadSlice.project),
    __metadata("design:type", Array)
], ProjectDbEntity.prototype, "uploads", void 0);
ProjectDbEntity = __decorate([
    (0, typeorm_1.Entity)(exports.PROJECTS_TABLE_NAME)
], ProjectDbEntity);
exports.ProjectDbEntity = ProjectDbEntity;
//# sourceMappingURL=project.entity.js.map