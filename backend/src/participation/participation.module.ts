import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationResolver } from './participation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participation])],
  providers: [ParticipationResolver, ParticipationService],
})
export class ParticipationModule { }
