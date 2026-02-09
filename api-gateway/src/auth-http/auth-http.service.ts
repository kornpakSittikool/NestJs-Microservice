import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { LoginDto } from './dto/login.dto';
import { firstValueFrom, timeout } from 'rxjs';
import { RpcResponse } from 'src/common/contracts/rpc-response';
import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';

type LoginResponse = {
  accessToken: string;
  email: string;
};
type LoginRpc = RpcResponse<LoginResponse>;

@Injectable()
export class AuthHttpService {
  constructor(@Inject('NATS_CLIENT') private readonly nats: ClientProxy) {}

  async login(body: LoginDto): Promise<LoginRpc> {
    const res = await firstValueFrom(
      this.nats
        .send<LoginRpc, LoginDto>('auth.login', body)
        .pipe(timeout(5000)),
    );
    if (!res.ok) {
      switch (res.error.code) {
        case 'VALIDATION':
          throw new BadRequestException(res.error);
        default:
          throw new BadGatewayException(res.error);
      }
    }
    return res;
  }

  health(): Promise<RpcResponse<{ ok: boolean; service: string }>> {
    return firstValueFrom(
      this.nats
        .send<
          RpcResponse<{ ok: boolean; service: string }>,
          Record<string, never>
        >('auth.health', {})
        .pipe(timeout(5000)),
    );
  }
}
