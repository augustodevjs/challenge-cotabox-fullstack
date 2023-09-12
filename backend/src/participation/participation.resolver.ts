import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParticipationService } from './participation.service';
import { Participation } from './entities/participation.entity';
import { CreateParticipationInput } from './dto/create-participation.input';
import { UpdateParticipationInput } from './dto/update-participation.input';

@Resolver(() => Participation)
export class ParticipationResolver {
  constructor(private readonly participationService: ParticipationService) {}

  @Mutation(() => Participation)
  createParticipation(@Args('createParticipationInput') createParticipationInput: CreateParticipationInput) {
    return this.participationService.create(createParticipationInput);
  }

  @Query(() => [Participation], { name: 'participation' })
  findAll() {
    return this.participationService.findAll();
  }

  @Query(() => Participation, { name: 'participation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.participationService.findOne(id);
  }

  @Mutation(() => Participation)
  updateParticipation(@Args('updateParticipationInput') updateParticipationInput: UpdateParticipationInput) {
    return this.participationService.update(updateParticipationInput.id, updateParticipationInput);
  }

  @Mutation(() => Participation)
  removeParticipation(@Args('id', { type: () => Int }) id: number) {
    return this.participationService.remove(id);
  }
}
