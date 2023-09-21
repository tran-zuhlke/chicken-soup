"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTestData = exports.images = exports.uploads = exports.projects = void 0;
const project_entity_1 = require("../persistence/project.entity");
const upload_entity_1 = require("../persistence/upload.entity");
const UploadStatus_1 = require("../domain/UploadStatus");
const image_entity_1 = require("../persistence/image.entity");
exports.projects = [
    {
        id: 'BLK001BAT00000',
        tenantId: 'T001',
        propertyId: 'BLK001',
        companyName: 'Tüv Süd',
        uploads: [],
        destinationPath: '',
    },
    {
        id: 'BLK002BAT00000',
        tenantId: 'T002',
        propertyId: 'BLK002',
        companyName: 'Zühlke Engineering',
        uploads: [],
        destinationPath: '',
    },
    {
        id: 'BLK003BAT00000',
        tenantId: 'T003',
        propertyId: 'BLK003',
        companyName: 'Drone Inc.',
        uploads: [],
        destinationPath: '',
    },
];
exports.uploads = [
    {
        id: 1,
        status: UploadStatus_1.UploadStatus.COMPLETE,
        project: exports.projects.find((p) => p.id === 'BLK001BAT00000'),
        images: [],
    },
    {
        id: 2,
        status: UploadStatus_1.UploadStatus.NEW,
        project: exports.projects.find((p) => p.id === 'BLK001BAT00000'),
        images: [],
    },
];
exports.images = [
    {
        id: 1,
        sourceFilePath: 'upload1/1.jpg',
        checksum: '',
        upload: exports.uploads.find((u) => u.id === 1),
        sizeInBytes: 3000000,
        lastModified: '2023-05-30T06:11:13.921Z',
        uploaded: true,
    },
    {
        id: 2,
        sourceFilePath: 'upload1/2.jpg',
        checksum: '',
        upload: exports.uploads.find((u) => u.id === 1),
        sizeInBytes: 3000000,
        lastModified: '2023-05-30T06:11:13.921Z',
        uploaded: true,
    },
    {
        id: 3,
        sourceFilePath: 'upload2/3.jpg',
        checksum: '',
        upload: exports.uploads.find((u) => u.id === 2),
        sizeInBytes: 3000000,
        lastModified: '2023-05-30T06:11:13.921Z',
        uploaded: true,
    },
];
const seedTestData = async (dataSource) => {
    const entityManager = dataSource.createEntityManager();
    await entityManager.save(project_entity_1.ProjectDbEntity, exports.projects);
    await entityManager.save(upload_entity_1.UploadDbEntity, exports.uploads);
    await entityManager.save(image_entity_1.ImageDbEntity, exports.images);
};
exports.seedTestData = seedTestData;
//# sourceMappingURL=seedTestData.js.map