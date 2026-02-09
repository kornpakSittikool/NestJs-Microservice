import { Test, TestingModule } from '@nestjs/testing';
import { AuthHttpController } from './auth-http.controller';
import { AuthHttpService } from './auth-http.service';

describe('AuthHttpController', () => {
  let controller: AuthHttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthHttpController],
      providers: [AuthHttpService],
    }).compile();

    controller = module.get<AuthHttpController>(AuthHttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
