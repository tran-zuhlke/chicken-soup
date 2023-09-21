import { ApiProperty } from '@nestjs/swagger';

export class CheckProjectAuthorizationRequest {
  @ApiProperty()
  projectUploadId: string;

  @ApiProperty()
  projectToken: string;

  @ApiProperty()
  tenantId: string;
}
