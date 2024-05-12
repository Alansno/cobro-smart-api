import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationServiceController } from './registration-service.controller';

describe('RegistrationServiceController', () => {
  let controller: RegistrationServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationServiceController],
    }).compile();

    controller = module.get<RegistrationServiceController>(RegistrationServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
