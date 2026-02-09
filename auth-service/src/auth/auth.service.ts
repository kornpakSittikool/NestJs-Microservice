import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { LoginDto } from './dto/login.dto';
import {
  fail as rpcFail,
  ok,
  RpcResponse,
} from 'src/common/contracts/rpc-response';

type LoginResult = { accessToken: string; email: string };

@Injectable()
export class AuthService {
  constructor(@Inject('NATS_CLIENT') private readonly nats: ClientProxy) {}

  authLogin(body: LoginDto): RpcResponse<LoginResult> {
    if (!body.email || !body.password) {
      return rpcFail('VALIDATION', 'email/password required');
    }
    return ok({ accessToken: 'mock-token', email: body.email });
  }

  authHealth(): RpcResponse<{ service: string }> {
    return ok({ service: 'auth-service' });
  }
}
