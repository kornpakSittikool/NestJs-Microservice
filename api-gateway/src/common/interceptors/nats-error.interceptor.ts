import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  ServiceUnavailableException,
  GatewayTimeoutException,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class NatsErrorInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      catchError((err: unknown) => {
        if (err instanceof HttpException) {
          return throwError(() => err);
        }
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('ECONNREFUSED') ||
          msg.includes('CONNECTION_REFUSED')
        ) {
          return throwError(
            () =>
              new ServiceUnavailableException({
                code: 'NATS_UNAVAILABLE',
                message: 'Cannot connect to NATS broker',
                detail: msg,
              }),
          );
        }
        if (msg.includes('Timeout') || msg.includes('timeout')) {
          return throwError(
            () =>
              new GatewayTimeoutException({
                code: 'SERVICE_TIMEOUT',
                message: 'Downstream service timeout',
                detail: msg,
              }),
          );
        }
        if (
          msg.includes('no subscribers') ||
          msg.includes('There are no subscribers')
        ) {
          return throwError(
            () =>
              new ServiceUnavailableException({
                code: 'NO_SUBSCRIBER',
                message: 'No service is listening to this subject',
                detail: msg,
              }),
          );
        }

        return throwError(
          () =>
            new BadGatewayException({
              code: 'DOWNSTREAM_ERROR',
              message: 'Downstream service error',
              detail: msg,
            }),
        );
      }),
    );
  }
}
