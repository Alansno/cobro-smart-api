import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationServiceService } from './registration-service.service';

describe('RegistrationServiceService', () => {
  let service: RegistrationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationServiceService],
    }).compile();

    service = module.get<RegistrationServiceService>(RegistrationServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
