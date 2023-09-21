import { ApiProperty } from '@nestjs/swagger';

export class ImageResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sourceFilePath: string;

  @ApiProperty()
  checksum: string;

  @ApiProperty()
  sizeInBytes: number;

  @ApiProperty()
  lastModified: string;

  @ApiProperty()
  uploaded: boolean;
}
