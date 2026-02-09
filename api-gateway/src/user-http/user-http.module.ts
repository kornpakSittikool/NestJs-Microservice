import { Module } from '@nestjs/common';
import { UserHttpService } from './user-http.service';
import { UserHttpController } from './user-http.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices/enums/transport.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL ?? 'nats://localhost:4222'],
          name: `auth-gateway-${process.pid}`,
        },
      },
    ]),
  ],
  controllers: [UserHttpController],
  providers: [UserHttpService],
})
export class UserHttpModule {}
