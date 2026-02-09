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

  // @Post()
  // create(@Body() createAuthHttpDto: CreateAuthHttpDto) {
  //   return this.authHttpService.create(createAuthHttpDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authHttpService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authHttpService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAuthHttpDto: UpdateAuthHttpDto,
  // ) {
  //   return this.authHttpService.update(+id, updateAuthHttpDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authHttpService.remove(+id);
  // }
}
