import { ApiProperty } from '@nestjs/swagger';
import { UploadResponse } from './upload.response';

export class ProjectResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  propertyId: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  destinationPath: string;

  @ApiProperty({ type: [UploadResponse] })
  uploads: UploadResponse[];
}
