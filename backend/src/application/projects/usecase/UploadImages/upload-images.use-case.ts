import { Injectable, Logger } from '@nestjs/common';
import { generateChecksum } from '../../validation/generateChecksum';
import { ValidationException } from '../../../exceptions/ValidationException';
import * as path from 'path';
import * as fs from 'fs';
import { GetProjectUseCase } from '../get-project.use-case';
import { Image, mapImageToDbEntity } from '../../../../domain/Image';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageDbEntity } from '../../../../persistence/image.entity';
import { Repository } from 'typeorm';
import { GetUploadUseCase } from '../get-upload.use-case';

@Injectable()
export class UploadImagesUseCase {
  private readonly logger = new Logger(UploadImagesUseCase.name);

  constructor(
    private getProjectUseCase: GetProjectUseCase,
    private getUploadUseCase: GetUploadUseCase,
    @InjectRepository(ImageDbEntity)
    private imagesRepository: Repository<ImageDbEntity>
  ) {}

  async invoke(projectId: string, uploadId: number, files: Array<Express.Multer.File>) {
    const project = await this.getProjectUseCase.invokeWithRelations(projectId, []);
    const upload = await this.getUploadUseCase.invoke(projectId, uploadId);
    const writeFilePromises = [];
    const uploadedImagesMetadata = [];

    this.logger.log(`Uploading ${files.length} images for upload ${uploadId}`);

    for (const file of files) {
      const imageMetadata = upload.images.find(
        (imageMetadata) => path.basename(imageMetadata.sourceFilePath) === file.originalname
      );
      if (!imageMetadata) {
        throw new Error(`No matching image metadata found for file ${file.originalname}`);
      }
      const generatedChecksum = generateChecksum(file);
      if (generatedChecksum !== imageMetadata.checksum) {
        throw new ValidationException(
          `Checksum for file ${file.originalname} does not match. \n Checksum from metadata: ${imageMetadata.checksum} \n Generated checksum ${generatedChecksum}`
        );
      }

      const uploadFilePathDirectory = path.join(
        __dirname,
        '../../../../../uploads',
        project.destinationPath,
        path.dirname(imageMetadata.sourceFilePath)
      );

      const targetDirectoryExists = fs.existsSync(uploadFilePathDirectory);
      if (!targetDirectoryExists) {
        this.logger.log(`Creating target directory ${uploadFilePathDirectory} for upload ${uploadId}`);
        await fs.promises.mkdir(uploadFilePathDirectory, { recursive: true });
      }
      writeFilePromises.push(
        fs.promises.writeFile(path.join(uploadFilePathDirectory, file.originalname), file.buffer).then(() => {
          uploadedImagesMetadata.push(imageMetadata);
          this.logger.log(`Successfully uploaded image ${file.originalname} for upload ${uploadId}`);
        })
      );
    }
    await Promise.all(writeFilePromises);
    this.logger.log(`Successfully uploaded ${files.length} images for upload ${uploadId}`);
    await this.markImagesAsUploaded(uploadedImagesMetadata);
  }

  private markImagesAsUploaded = async (images: Image[]) => {
    const mappedImages = images.map((image) => ({ ...mapImageToDbEntity(image), uploaded: true }));
    await this.imagesRepository.save(mappedImages);
    this.logger.log(`Marked ${images.length} images as uploaded in image metadata`);
  };
}
