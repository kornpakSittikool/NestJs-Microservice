import { Injectable } from '@nestjs/common';
import { ok, RpcResponse } from 'src/common/contracts/rpc-response';

@Injectable()
export class UserService {
  userHealth(): RpcResponse<{ service: string }> {
    return ok({ service: 'user-service' });
  }

  userGetProfile({
    id,
  }: {
    id: string;
  }): RpcResponse<{ id: string; name: string; role: string }> {
    if (!id) {
      return {
        ok: false,
        error: { code: 'VALIDATION', message: 'id required' },
      };
    }
    return {
      ok: true,
      data: { id: id, name: 'Mock User', role: 'user' },
    };
  }
}
