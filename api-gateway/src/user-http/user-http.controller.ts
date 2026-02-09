import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserHttpService } from './user-http.service';

type LoginResponse = unknown;

@Controller('user-http')
export class UserHttpController {
  constructor(private readonly userHttpService: UserHttpService) {}

  @Get(':id')
  getProfile(@Param('id') id: string) {
    return this.userHttpService.getProfile(id);
  }

  @Post('health')
  async health(): Promise<LoginResponse> {
    return this.userHttpService.health();
  }
}
