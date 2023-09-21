"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapImageToResponse = exports.mapImageToDbEntity = exports.mapImageFromDbEntity = void 0;
const mapImageFromDbEntity = (imageDbEntity) => ({
    id: imageDbEntity.id.toString(),
    sourceFilePath: imageDbEntity.sourceFilePath.toString(),
    checksum: imageDbEntity.checksum.toString(),
    sizeInBytes: imageDbEntity.sizeInBytes,
    lastModified: imageDbEntity.lastModified,
    uploaded: imageDbEntity.uploaded,
});
exports.mapImageFromDbEntity = mapImageFromDbEntity;
const mapImageToDbEntity = (image) => ({
    id: Number(image.id),
    sourceFilePath: image.sourceFilePath,
    checksum: image.checksum,
    sizeInBytes: image.sizeInBytes,
    lastModified: image.lastModified,
    uploaded: image.uploaded,
});
exports.mapImageToDbEntity = mapImageToDbEntity;
const mapImageToResponse = (image) => ({
    id: image.id,
    uploaded: image.uploaded,
    checksum: image.checksum,
    sizeInBytes: image.sizeInBytes,
    lastModified: image.lastModified,
    sourceFilePath: image.sourceFilePath,
});
exports.mapImageToResponse = mapImageToResponse;
//# sourceMappingURL=Image.js.map