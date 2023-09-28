import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectDbEntity } from '../../persistence/project.entity';
import { ImageDbEntity } from '../../persistence/image.entity';
import { UploadDbEntity } from '../../persistence/upload.entity';
import { ProjectsController } from './projects.controller';
import { FacadeApi } from '../../api/facadeApi/facade.api';
import { HttpModule } from '@nestjs/axios';
import { UploadsController } from './uploads.controller';
import { CreateProjectUseCase } from './usecase/create-project.use-case';
import { CreateUploadUseCase } from './usecase/create-upload.use-case';
import { GetProjectUseCase } from './usecase/get-project.use-case';
import { CheckProjectAuthorizationUseCase } from './usecase/check-project-authorization.use-case';
import { UpdateUploadStatusUseCase } from './usecase/update-upload-status.use-case';
import { UploadImagesUseCase } from './usecase/UploadImages/upload-images.use-case';
import { GetUploadUseCase } from './usecase/get-upload.use-case';
import { NotifyProjectUploadCompletionUseCase } from './usecase/notify-project-upload-completion.use-case';
import { UpdateImageChecksumUseCase } from './usecase/update-image-checksum.use-case.service';
import { TestController } from './test.controller';
import { DishesController } from './dishes.controller';
import { GetDishUseCase } from './usecase/get-dish.use-case';
import { DishDbEntity } from '../../persistence/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectDbEntity, ImageDbEntity, UploadDbEntity, DishDbEntity]), HttpModule],
  controllers: [ProjectsController, UploadsController, TestController, DishesController],
  providers: [
    CreateProjectUseCase,
    CreateUploadUseCase,
    GetProjectUseCase,
    CheckProjectAuthorizationUseCase,
    UpdateUploadStatusUseCase,
    UploadImagesUseCase,
    GetUploadUseCase,
    UpdateImageChecksumUseCase,
    NotifyProjectUploadCompletionUseCase,
    GetDishUseCase,
    FacadeApi,
  ],
  exports: [CheckProjectAuthorizationUseCase],
})
export class ProjectsModule {}
