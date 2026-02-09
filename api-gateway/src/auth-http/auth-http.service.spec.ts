import { Test, TestingModule } from '@nestjs/testing';
import { AuthHttpService } from './auth-http.service';

describe('AuthHttpService', () => {
  let service: AuthHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthHttpService],
    }).compile();

    service = module.get<AuthHttpService>(AuthHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
