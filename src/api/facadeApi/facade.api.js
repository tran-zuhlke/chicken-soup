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
var FacadeApi_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacadeApi = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const api_exception_1 = require("../api.exception");
let FacadeApi = FacadeApi_1 = class FacadeApi {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(FacadeApi_1.name);
        this.baseUrl = process.env.FACADE_API_BASE_URL;
    }
    async checkAuthorizationAndGetProjectDetails(projectUploadId, projectToken, tenantId) {
        const url = `${this.baseUrl}/temp-login`;
        const request = {
            user: projectUploadId,
            password: projectToken,
        };
        this.logger.debug(`Calling ${url} to validate project token for uploadId ${projectUploadId} and tenantId ${tenantId}`);
        const { data: response } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post(url, request, {
            headers: this.getDefaultRequestHeaders(tenantId),
        })
            .pipe((0, rxjs_1.catchError)(this.handleError(url))));
        this.logger.debug(`Project token validation for uploadId ${projectUploadId} was successful`);
        return this.mapToProjectDetails(response, tenantId);
    }
    async notifyProjectUploadCompletion(propertyId, projectId, tenantId) {
        const url = `${this.baseUrl}/notify-image-upload`;
        const request = {
            blockId: propertyId,
            batchId: projectId,
        };
        this.logger.log(`Calling ${url} to notifying project upload completion for project ${projectId} and tenantId ${tenantId}`);
        const { data: response } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post(url, request, {
            headers: this.getDefaultRequestHeaders(tenantId),
        })
            .pipe((0, rxjs_1.catchError)(this.handleError(url))));
        this.logger.log(`Successfully notified project upload completion for project ${projectId} and tenantId ${tenantId}. Message: ${response.message}`);
        return response.message;
    }
    handleError(url) {
        return (error) => {
            let errorMessage = `Received error calling ${url}: ${error.message}`;
            if (this.isFacadeApiErrorResponse(error.response.data)) {
                errorMessage = error.response.data.message.error;
            }
            this.logger.error(`Received error response calling ${url}: ${errorMessage}`);
            throw new api_exception_1.ApiException(error.status, errorMessage);
        };
    }
    getDefaultRequestHeaders(tenantId) {
        return {
            'Content-Type': 'application/json',
            [FacadeApi_1.TENANT_ID_HEADER_KEY]: tenantId,
        };
    }
    mapToProjectDetails(dto, tenantId) {
        return {
            companyName: dto.message.companyName,
            propertyId: dto.message.blockId,
            projectId: dto.message.batchId,
            tenantId: tenantId,
        };
    }
    isFacadeApiErrorResponse(errorData) {
        return (errorData.message !== undefined &&
            errorData.message.error !== undefined);
    }
};
FacadeApi.TENANT_ID_HEADER_KEY = 'x-tenant-id';
FacadeApi = FacadeApi_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], FacadeApi);
exports.FacadeApi = FacadeApi;
//# sourceMappingURL=facade.api.js.map