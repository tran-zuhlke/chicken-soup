import { UploadStatus } from '../../../domain/UploadStatus';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUploadRequest {
  @ApiProperty()
  uploadStatus: UploadStatus;
}
