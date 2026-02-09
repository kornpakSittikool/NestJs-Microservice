import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { RpcResponse } from 'src/common/contracts/rpc-response';

type ProfileRpc = RpcResponse<{ id: string; name: string; role: string }>;

@Injectable()
export class UserHttpService {
  constructor(@Inject('NATS_CLIENT') private readonly nats: ClientProxy) {}

  health(): Promise<RpcResponse<{ ok: boolean; service: string }>> {
    return firstValueFrom(
      this.nats
        .send<
          RpcResponse<{ ok: boolean; service: string }>,
          Record<string, never>
        >('user.health', {})
        .pipe(timeout(5000)),
    );
  }

  async getProfile(id: string): Promise<ProfileRpc> {
    const res = await firstValueFrom(
      this.nats
        .send<ProfileRpc, { id: string }>('user.getProfile', { id })
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
}
