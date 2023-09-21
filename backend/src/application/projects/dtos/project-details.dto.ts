import { ApiProperty } from '@nestjs/swagger';

export class ProjectDetails {
  @ApiProperty()
  companyName: string;

  @ApiProperty()
  propertyId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  tenantId: string;
}
