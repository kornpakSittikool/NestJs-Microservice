import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthHttpModule } from './auth-http/auth-http.module';

@Module({
  imports: [AuthHttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
