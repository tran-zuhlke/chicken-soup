import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiMocks } from './api/mocks/api.mocks';
import { GlobalExceptionFilter } from './infrastructure/filters/global-exception.filter';
import * as bodyParser from 'body-parser';
import { ImATeapotException } from '@nestjs/common';

const whitelist = [
  'http://localhost:8081',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://10.0.2.2:3000',
  'https://tran-zuhlke.github.io',
];

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (
        whitelist.includes(origin) || // Checks your whitelist
        !!origin.match(/yourdomain\.com$/) // Overall check for your domain
      ) {
        console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(new ImATeapotException('Not allowed by CORS'), false);
      }
    },
  });
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
