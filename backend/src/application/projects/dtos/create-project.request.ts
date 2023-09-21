import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectRequest {
  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  propertyId: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  destinationPath: string;
}
