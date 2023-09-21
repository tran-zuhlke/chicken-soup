import { HttpStatus } from '@nestjs/common';
export interface ExceptionDto {
    path: string;
    message: string;
    status: HttpStatus;
}
