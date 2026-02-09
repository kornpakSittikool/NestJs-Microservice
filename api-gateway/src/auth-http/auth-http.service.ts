import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { LoginDto } from './dto/login.dto';
import { firstValueFrom, timeout } from 'rxjs';
import { ok, RpcResponse } from 'src/common/contracts/rpc-response';

type LoginResponse = {
  accessToken: string;
  email: string;
};
type LoginRpc = RpcResponse<LoginResponse>;

@Injectable()
export class AuthHttpService {
  constructor(@Inject('NATS_CLIENT') private readonly nats: ClientProxy) {}

  async login(body: LoginDto): Promise<LoginRpc> {
    const raw = await firstValueFrom(
      this.nats
        .send<LoginRpc, LoginDto>('auth.login', body)
        .pipe(timeout(5000)),
    );
    if (raw.ok === false) {
      throw new Error(raw.error.message);
    }
    return 'ok' in raw ? raw : ok(raw);
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
  // create(createAuthHttpDto: CreateAuthHttpDto) {
  //   return 'This action adds a new authHttp';
  // }

  // findAll() {
  //   return `This action returns all authHttp`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} authHttp`;
  // }

  // update(id: number, updateAuthHttpDto: UpdateAuthHttpDto) {
  //   return `This action updates a #${id} authHttp`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} authHttp`;
  // }
}
