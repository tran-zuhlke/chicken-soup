import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiMocks } from './api/mocks/api.mocks';
import { GlobalExceptionFilter } from './infrastructure/filters/global-exception.filter';
import * as bodyParser from 'body-parser';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new GlobalExceptionFilter());
  // app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));

  const config = new DocumentBuilder()
    .setTitle('BTD Image Upload')
    .setDescription('BTD Image Upload Server API Spec')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (JSON.parse(process.env.API_MOCKS_ENABLED)) {
    apiMocks.listen();
  }
  await app.listen(3000);
};
bootstrap().catch((e) => console.log('Fatal error during startup: ', e));
