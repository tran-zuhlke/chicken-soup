import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDataSource } from './persistence/dataSource';
import { createTestDataSource } from './testing/createTestDataSource';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './application/projects/projects.module';
import { DishesModule } from './application/dishes/dishes.module';
import { AuthModule } from './application/auth/auth.module';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'frontend/dist'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        migrationsRun: false,
      }),
      dataSourceFactory: async () => {
        return process.env.NODE_ENV === 'test' ? createTestDataSource() : createDataSource();
      },
    }),
    ProjectsModule,
    DishesModule,
    AuthModule,
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
