"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const api_mocks_1 = require("./api/mocks/api.mocks");
const global_exception_filter_1 = require("./infrastructure/filters/global-exception.filter");
const bodyParser = require("body-parser");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('/api');
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    app.enableCors();
    app.use(bodyParser.json({ limit: '10mb' }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('BTD Image Upload')
        .setDescription('BTD Image Upload Server API Spec')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    if (JSON.parse(process.env.API_MOCKS_ENABLED)) {
        api_mocks_1.apiMocks.listen();
    }
    await app.listen(3000);
};
bootstrap().catch((e) => console.log('Fatal error during startup: ', e));
//# sourceMappingURL=main.js.map