import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import {
  fail as rpcFail,
  ok,
  RpcResponse,
} from 'src/common/contracts/rpc-response';

type LoginResult = { accessToken: string; email: string };

@Injectable()
export class AuthService {
  authLogin(body: LoginDto): RpcResponse<LoginResult> {
    if (!body.email || !body.password) {
      return rpcFail('VALIDATION', 'email/password required');
    }
    return ok({ accessToken: 'mock-token', email: body.email });
  }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }
  // findAll() {
  //   return `This action returns all auth`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
