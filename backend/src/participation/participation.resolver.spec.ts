import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationResolver } from './participation.resolver';
import { ParticipationService } from './participation.service';

describe('ParticipationResolver', () => {
  let resolver: ParticipationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipationResolver, ParticipationService],
    }).compile();

    resolver = module.get<ParticipationResolver>(ParticipationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
