import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';

import { Participation } from './entities/participation.entity';

import { CreateParticipationInput } from './dto/create-participation.input';
import { UpdateParticipationInput } from './dto/update-participation.input';

@Injectable()
export class ParticipationService {
  constructor(@InjectRepository(Participation) private participationRepository: Repository<Participation>) { }

  async create(createParticipationInput: CreateParticipationInput): Promise<Participation> {
    const createParticipation = new Participation();
    Object.assign(createParticipation, createParticipationInput)

    await validateOrReject(createParticipation);
    return await this.participationRepository.save(createParticipation)
  }

  async findAll(): Promise<Participation[]> {
    return await this.participationRepository.find();
  }

  async findOne(id: number): Promise<Participation> {
    return await this.participationRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateParticipationInput: UpdateParticipationInput): Promise<Participation> {
    const updateParticipation = await this.participationRepository.findOne({
      where: {
        id
      }
    });

    Object.assign(updateParticipation, updateParticipationInput);

    await validateOrReject(updateParticipation);

    return await this.participationRepository.save(updateParticipation)
  }

  async remove(id: number): Promise<void> {
    await this.participationRepository.delete({ id });
  }
}
