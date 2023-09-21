"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
class ApiException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map