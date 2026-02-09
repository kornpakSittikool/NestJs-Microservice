import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/swagger.config';
import { NatsErrorInterceptor } from './common/interceptors/nats-error.interceptor';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { HttpRpcExceptionFilter } from './common/filters/http-rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new NatsErrorInterceptor());
  app.useGlobalFilters(new HttpRpcExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
