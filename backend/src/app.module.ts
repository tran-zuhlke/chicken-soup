import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DishesModule } from './application/dishes/dishes.module';
import { AuthModule } from './application/auth/auth.module';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './application/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'frontend/dist'),
    }),
    DishesModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
