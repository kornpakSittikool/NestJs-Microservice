import { Controller, Post, Body } from '@nestjs/common';
import { AuthHttpService } from './auth-http.service';
import { LoginDto } from './dto/login.dto';

type LoginResponse = unknown;

@Controller('auth-http')
export class AuthHttpController {
  constructor(private readonly authHttpService: AuthHttpService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return this.authHttpService.login(body);
  }

  @Post('health')
  async health(): Promise<LoginResponse> {
    return this.authHttpService.health();
  }
}
