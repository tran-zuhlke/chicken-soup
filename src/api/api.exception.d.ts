import { HttpStatus } from '@nestjs/common';
export declare class ApiException extends Error {
    readonly status: HttpStatus;
    constructor(status: HttpStatus, message: string);
}
