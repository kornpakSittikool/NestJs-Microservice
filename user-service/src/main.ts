import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getNatsMicroserviceOptions } from './configs/microservice.config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    getNatsMicroserviceOptions(),
  );
  await app.listen();
}
void bootstrap();
