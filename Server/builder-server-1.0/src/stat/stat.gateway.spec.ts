import { Test, TestingModule } from '@nestjs/testing';
import { StatGateway } from './stat.gateway';
import { StatService } from './stat.service';

describe('StatGateway', () => {
  let gateway: StatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatGateway, StatService],
    }).compile();

    gateway = module.get<StatGateway>(StatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
