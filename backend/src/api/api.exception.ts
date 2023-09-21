import { HttpStatus } from '@nestjs/common';

export class ApiException extends Error {
  constructor(readonly status: HttpStatus, message: string) {
    super(message);
  }
}
