import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Payload } from '@nestjs/microservices/decorators/payload.decorator';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login')
  login(@Payload() data: LoginDto) {
    return this.authService.authLogin(data);
  }

  @MessagePattern('auth.health')
  health() {
    return this.authService.authHealth();
  }
}
