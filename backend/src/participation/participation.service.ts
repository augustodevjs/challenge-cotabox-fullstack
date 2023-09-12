import { Injectable } from '@nestjs/common';
import { CreateParticipationInput } from './dto/create-participation.input';
import { UpdateParticipationInput } from './dto/update-participation.input';

@Injectable()
export class ParticipationService {
  create(createParticipationInput: CreateParticipationInput) {
    return 'This action adds a new participation';
  }

  findAll() {
    return `This action returns all participation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participation`;
  }

  update(id: number, updateParticipationInput: UpdateParticipationInput) {
    return `This action updates a #${id} participation`;
  }

  remove(id: number) {
    return `This action removes a #${id} participation`;
  }
}
