import { UploadStatus } from '../../../domain/UploadStatus';
import { ApiProperty } from '@nestjs/swagger';
import { ImageResponse } from './image.response';

export class UploadResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: UploadStatus;

  @ApiProperty({ type: [ImageResponse] })
  images: ImageResponse[];
}
