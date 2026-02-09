import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export function getNatsMicroserviceOptions(): MicroserviceOptions {
  return {
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL ?? 'nats://localhost:4222'],
      name: `auth-service-${process.pid}`,
    },
  };
}
