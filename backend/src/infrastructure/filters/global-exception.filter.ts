import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from '../../api/api.exception';
import { ExceptionDto } from '../exception.dto';

/**
 * Global-scoped filter that is used across the whole application, for every controller and every route handler.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof ApiException) {
      message = exception.message;
      status = exception.status === HttpStatus.UNAUTHORIZED ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof NotFoundException) {
      message = exception.message;
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof BadRequestException) {
      message = exception.message;
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof ForbiddenException) {
      message = exception.message;
      status = HttpStatus.FORBIDDEN;
    } else if (exception instanceof UnauthorizedException) {
      message = exception.message;
      status = HttpStatus.UNAUTHORIZED;
    } else if (exception instanceof Error) {
      message = exception.message;
    } else {
      message = 'Internal server error';
    }
    const exceptionDto: ExceptionDto = {
      path: request.url,
      message,
      status,
    };
    this.logger.error(
      `Uncaught exception: ${exceptionDto.message}`,
      exception instanceof Error ? exception.stack : exception
    );
    response.status(status).json(exceptionDto);
  }
}
