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
exports.AppGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const project_authorization_guard_1 = require("./project-authorization.guard");
let AppGuard = class AppGuard {
    constructor(reflector, authorizationGuard) {
        this.reflector = reflector;
        this.authorizationGuard = authorizationGuard;
    }
    async canActivate(context) {
        return await this.authorizationGuard.canActivate(context);
    }
};
AppGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, project_authorization_guard_1.ProjectAuthorizationGuard])
], AppGuard);
exports.AppGuard = AppGuard;
//# sourceMappingURL=app.guard.js.map