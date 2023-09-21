"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUploadToResponse = exports.mapUploadFromDbEntity = void 0;
const Image_1 = require("./Image");
const UploadStatus_1 = require("./UploadStatus");
const mapUploadFromDbEntity = (uploadDbEntity) => {
    var _a, _b;
    return ({
        id: uploadDbEntity.id.toString(),
        status: UploadStatus_1.UploadStatus[uploadDbEntity.status],
        images: (_b = (_a = uploadDbEntity.images) === null || _a === void 0 ? void 0 : _a.map((image) => (0, Image_1.mapImageFromDbEntity)(image))) !== null && _b !== void 0 ? _b : [],
    });
};
exports.mapUploadFromDbEntity = mapUploadFromDbEntity;
const mapUploadToResponse = (upload) => ({
    id: upload.id,
    status: upload.status,
    images: upload.images.map((i) => (0, Image_1.mapImageToResponse)(i)),
});
exports.mapUploadToResponse = mapUploadToResponse;
//# sourceMappingURL=Upload.js.map