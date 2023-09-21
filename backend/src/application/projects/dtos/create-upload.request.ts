import { UploadMetadata } from '../types/UploadMetadata';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadRequest {
  @ApiProperty()
  uploadMetadata: UploadMetadata;
}
