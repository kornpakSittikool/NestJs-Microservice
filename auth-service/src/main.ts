import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getNatsMicroserviceOptions } from './configs/microservice.config';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { RpcAllExceptionsFilter } from './common/filters/rpc-all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    getNatsMicroserviceOptions(),
  );
  app.useGlobalFilters(new RpcAllExceptionsFilter());
  await app.listen();
}
void bootstrap();
