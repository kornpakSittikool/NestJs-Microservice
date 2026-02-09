import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { fail } from 'src/common/contracts/rpc-response';

type ErrorResponseShape = {
  message?: unknown;
  error?: unknown;
  code?: unknown;
  detail?: unknown;
};

@Catch()
export class HttpRpcExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_ERROR';
    let message = 'Internal server error';
    let detail: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus() as HttpStatus;
      const res: unknown = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
        code = mapStatusToCode(status);
      } else if (res && typeof res === 'object') {
        const obj = res as ErrorResponseShape;
        code =
          typeof obj.code === 'string' ? obj.code : mapStatusToCode(status);

        if (Array.isArray(obj.message)) {
          message = 'Validation failed';
          detail = obj.message;
          if (typeof obj.code !== 'string') {
            code = 'VALIDATION';
          }
        } else if (typeof obj.message === 'string') {
          message = obj.message;
        } else if (typeof obj.error === 'string') {
          message = obj.error;
        }

        if (obj.detail !== undefined) {
          detail = obj.detail;
        }
      } else {
        code = mapStatusToCode(status);
      }
    } else if (exception instanceof Error) {
      detail = exception.message;
    } else if (exception !== undefined) {
      detail = exception;
    }

    response.status(status).json(fail(code, message, detail));
  }
}

function mapStatusToCode(status: HttpStatus): string {
  const statusCode = status as number;
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      return 'BAD_REQUEST';
    case HttpStatus.UNAUTHORIZED:
      return 'UNAUTHORIZED';
    case HttpStatus.FORBIDDEN:
      return 'FORBIDDEN';
    case HttpStatus.NOT_FOUND:
      return 'NOT_FOUND';
    case HttpStatus.CONFLICT:
      return 'CONFLICT';
    case HttpStatus.TOO_MANY_REQUESTS:
      return 'RATE_LIMIT';
    case HttpStatus.SERVICE_UNAVAILABLE:
      return 'SERVICE_UNAVAILABLE';
    case HttpStatus.GATEWAY_TIMEOUT:
      return 'SERVICE_TIMEOUT';
    case HttpStatus.BAD_GATEWAY:
      return 'BAD_GATEWAY';
    default:
      return statusCode >= 500 ? 'INTERNAL_ERROR' : 'HTTP_ERROR';
  }
}
