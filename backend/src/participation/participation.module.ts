import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationResolver } from './participation.resolver';

@Module({
  providers: [ParticipationResolver, ParticipationService]
})
export class ParticipationModule {}
