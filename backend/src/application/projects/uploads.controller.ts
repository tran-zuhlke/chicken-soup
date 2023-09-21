import {
  Body,
  Controller,
  FileTypeValidator,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { mapUploadToResponse } from '../../domain/Upload';
import { UpdateUploadRequest } from './dtos/update-upload.request';
import { CreateUploadRequest } from './dtos/create-upload.request';
import { UpdateChecksumRequest } from './dtos/update-checksum.request';
import { UploadImagesResponse } from './dtos/upload-images.response';
import { convertMegabyteToByte } from '../utils/convertMegabyteToByte';
import { ACCEPTED_FILE_TYPE, MAX_FILE_SIZE_IN_MB } from './validation/constants';
import { CreateUploadUseCase } from './usecase/create-upload.use-case';
import { UpdateUploadStatusUseCase } from './usecase/update-upload-status.use-case';
import { UploadImagesUseCase } from './usecase/UploadImages/upload-images.use-case';
import { UpdateImageChecksumUseCase } from './usecase/update-image-checksum.use-case.service';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UploadResponse } from './dtos/upload.response';
import { FilesUploadDto } from './dtos/files-upload.request';

@ApiTags('Uploads')
@Controller('/projects/:projectId/uploads')
export class UploadsController {
  private readonly logger = new Logger(UploadsController.name);

  constructor(
    private createUploadUseCase: CreateUploadUseCase,
    private updateUploadStatusUseCase: UpdateUploadStatusUseCase,
    private uploadImagesUseCase: UploadImagesUseCase,
    private updateChecksumMetadataUseCase: UpdateImageChecksumUseCase
  ) {}

  @Post()
  @ApiOkResponse({ type: UploadResponse })
  async createUploadMetadata(
    @Param('projectId') projectId: string,
    @Body() requestBody: CreateUploadRequest
  ): Promise<UploadResponse> {
    this.logger.log(`Creating an upload for project ${projectId}`);
    const upload = await this.createUploadUseCase.invoke(projectId, {
      images: requestBody.uploadMetadata.images,
    });
    return mapUploadToResponse(upload);
  }

  @Put(':id')
  @ApiOkResponse({ type: UploadResponse })
  async updateUpload(
    @Param('projectId') projectId: string,
    @Param('id') id: number,
    @Body() requestBody: UpdateUploadRequest
  ): Promise<UploadResponse> {
    this.logger.log(`Updating upload ${id} for project ${projectId}`);
    const upload = await this.updateUploadStatusUseCase.invoke(projectId, id, requestBody.uploadStatus);
    return mapUploadToResponse(upload);
  }

  @Post(':id/start')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  async uploadImages(
    @Param('projectId') projectId: string,
    @Param('id') id: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: convertMegabyteToByte(MAX_FILE_SIZE_IN_MB) }),
          new FileTypeValidator({ fileType: ACCEPTED_FILE_TYPE }),
        ],
      })
    )
    files: Array<Express.Multer.File>
  ): Promise<UploadImagesResponse> {
    await this.uploadImagesUseCase.invoke(projectId, id, files);
    const uploadedFiles = files.map((file) => ({
      originalName: file.originalname,
      fileName: file.filename,
      destinationPath: file.path,
    }));
    return { uploadedFiles: uploadedFiles };
  }

  @Put(':id/imagesChecksum')
  async updateChecksum(
    @Param('projectId') projectId: string,
    @Param('id') id: number,
    @Body() requestBody: UpdateChecksumRequest
  ): Promise<UploadResponse> {
    this.logger.log(`Updating checksum for upload ${id}`);
    const upload = await this.updateChecksumMetadataUseCase.invoke(id, requestBody.imagesChecksumMetadata);
    return mapUploadToResponse(upload);
  }
}
