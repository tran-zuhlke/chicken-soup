"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToProjectResponse = exports.mapProjectFromDbEntity = void 0;
const Upload_1 = require("./Upload");
const mapProjectFromDbEntity = (projectDbEntity) => {
    var _a, _b;
    return ({
        id: projectDbEntity.id.toString(),
        tenantId: projectDbEntity.tenantId,
        propertyId: projectDbEntity.propertyId,
        companyName: projectDbEntity.companyName,
        destinationPath: projectDbEntity.destinationPath.toString(),
        uploads: (_b = (_a = projectDbEntity.uploads) === null || _a === void 0 ? void 0 : _a.map((uploadDbEntity) => (0, Upload_1.mapUploadFromDbEntity)(uploadDbEntity))) !== null && _b !== void 0 ? _b : [],
    });
};
exports.mapProjectFromDbEntity = mapProjectFromDbEntity;
const mapToProjectResponse = (project) => ({
    id: project.id,
    tenantId: project.tenantId,
    propertyId: project.propertyId,
    companyName: project.companyName,
    destinationPath: project.destinationPath,
    uploads: project.uploads.map((u) => (0, Upload_1.mapUploadToResponse)(u)),
});
exports.mapToProjectResponse = mapToProjectResponse;
//# sourceMappingURL=Project.js.map