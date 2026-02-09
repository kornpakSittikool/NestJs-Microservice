import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch()
export class RpcAllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const msg =
      exception instanceof Error ? exception.message : String(exception);

    return super.catch(
      new RpcException({
        ok: false,
        error: {
          code: 'AUTH_SERVICE_ERROR',
          message: 'Auth service failed',
          detail: msg,
        },
      }),
      host,
    );
  }
}
