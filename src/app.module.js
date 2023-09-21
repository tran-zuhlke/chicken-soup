"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const dataSource_1 = require("./persistence/dataSource");
const createTestDataSource_1 = require("./testing/createTestDataSource");
const config_1 = require("@nestjs/config");
const projects_module_1 = require("./application/projects/projects.module");
const core_1 = require("@nestjs/core");
const app_guard_1 = require("./infrastructure/guards/app.guard");
const project_authorization_guard_1 = require("./infrastructure/guards/project-authorization.guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../../', 'frontend/dist'),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    migrationsRun: false,
                }),
                dataSourceFactory: async () => {
                    return process.env.NODE_ENV === 'test' ? (0, createTestDataSource_1.createTestDataSource)() : (0, dataSource_1.createDataSource)();
                },
            }),
            projects_module_1.ProjectsModule,
        ],
        controllers: [],
        providers: [
            project_authorization_guard_1.ProjectAuthorizationGuard,
            {
                provide: core_1.APP_GUARD,
                useClass: app_guard_1.AppGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map