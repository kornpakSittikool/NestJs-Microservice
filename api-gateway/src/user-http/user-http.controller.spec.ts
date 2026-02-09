import { Test, TestingModule } from '@nestjs/testing';
import { UserHttpController } from './user-http.controller';
import { UserHttpService } from './user-http.service';

describe('UserHttpController', () => {
  let controller: UserHttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHttpController],
      providers: [UserHttpService],
    }).compile();

    controller = module.get<UserHttpController>(UserHttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
