"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facadeApiMockHandlers = exports.projectDetails = void 0;
const msw_1 = require("msw");
const common_1 = require("@nestjs/common");
exports.projectDetails = {
    companyName: 'Tüv Süd',
    propertyId: 'BLK001',
    projectId: 'BLK001BAT00000',
    tenantId: 'TUVSUD',
};
exports.facadeApiMockHandlers = [
    msw_1.rest.post(`${process.env.FACADE_API_BASE_URL}/temp-login`, (req, res, ctx) => {
        const response = {
            status: 'success',
            message: {
                status: true,
                companyName: exports.projectDetails.companyName,
                blockId: exports.projectDetails.propertyId,
                batchId: exports.projectDetails.projectId,
            },
        };
        return res(ctx.status(common_1.HttpStatus.OK), ctx.json(response));
    }),
    msw_1.rest.post(`${process.env.FACADE_API_BASE_URL}/notify-image-upload`, (req, res, ctx) => {
        const response = {
            message: 'Successfully completed project upload phase',
            status: true,
        };
        return res(ctx.status(common_1.HttpStatus.OK), ctx.json(response));
    }),
];
//# sourceMappingURL=facade-api.mock-handlers.js.map