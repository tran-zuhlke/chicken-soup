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
exports.ImageDbEntity = exports.IMAGES_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const upload_entity_1 = require("./upload.entity");
exports.IMAGES_TABLE_NAME = 'Images';
let ImageDbEntity = class ImageDbEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ImageDbEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageDbEntity.prototype, "sourceFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ImageDbEntity.prototype, "sizeInBytes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageDbEntity.prototype, "lastModified", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ImageDbEntity.prototype, "uploaded", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageDbEntity.prototype, "checksum", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => upload_entity_1.UploadDbEntity, (upload) => upload.images),
    __metadata("design:type", upload_entity_1.UploadDbEntity)
], ImageDbEntity.prototype, "upload", void 0);
ImageDbEntity = __decorate([
    (0, typeorm_1.Entity)(exports.IMAGES_TABLE_NAME)
], ImageDbEntity);
exports.ImageDbEntity = ImageDbEntity;
//# sourceMappingURL=image.entity.js.map