"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const api_exception_1 = require("../../api/api.exception");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let message;
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof api_exception_1.ApiException) {
            message = exception.message;
            status = exception.status === common_1.HttpStatus.UNAUTHORIZED ? exception.status : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else if (exception instanceof common_1.NotFoundException) {
            message = exception.message;
            status = common_1.HttpStatus.NOT_FOUND;
        }
        else if (exception instanceof common_1.BadRequestException) {
            message = exception.message;
            status = common_1.HttpStatus.BAD_REQUEST;
        }
        else if (exception instanceof common_1.ForbiddenException) {
            message = exception.message;
            status = common_1.HttpStatus.FORBIDDEN;
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        else {
            message = 'Internal server error';
        }
        const exceptionDto = {
            path: request.url,
            message,
            status,
        };
        this.logger.error(`Uncaught exception: ${exceptionDto.message}`, exception instanceof Error ? exception.stack : exception);
        response.status(status).json(exceptionDto);
    }
};
GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
exports.GlobalExceptionFilter = GlobalExceptionFilter;
//# sourceMappingURL=global-exception.filter.js.map