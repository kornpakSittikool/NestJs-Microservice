import { Module } from '@nestjs/common';
import { AuthHttpService } from './auth-http.service';
import { AuthHttpController } from './auth-http.controller';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL ?? 'nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [AuthHttpController],
  providers: [AuthHttpService],
})
export class AuthHttpModule {}
