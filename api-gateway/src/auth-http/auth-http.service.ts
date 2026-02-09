import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { LoginDto } from './dto/login.dto';
import { firstValueFrom, timeout } from 'rxjs';

type LoginResponse = unknown;

@Injectable()
export class AuthHttpService {
  constructor(@Inject('NATS_CLIENT') private readonly nats: ClientProxy) {}

  login(body: LoginDto): Promise<LoginResponse> {
    return firstValueFrom(
      this.nats
        .send<LoginResponse, LoginDto>('auth.login', body)
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
