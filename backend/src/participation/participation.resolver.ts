import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParticipationService } from './participation.service';
import { Participation } from './entities/participation.entity';
import { CreateParticipationInput } from './dto/create-participation.input';
import { UpdateParticipationInput } from './dto/update-participation.input';

@Resolver(() => Participation)
export class ParticipationResolver {
  constructor(private readonly participationService: ParticipationService) { }

  @Mutation(() => Participation)
  async createParticipation(
    @Args('createParticipationInput')
    createParticipationInput: CreateParticipationInput,
  ) {
    return await this.participationService.create(createParticipationInput);
  }

  @Query(() => [Participation], { name: 'participation' })
  async findAll() {
    return await this.participationService.findAll();
  }

  @Query(() => Participation, { name: 'participation' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.participationService.findOne(id);
  }

  @Mutation(() => Participation)
  async updateParticipation(
    @Args('updateParticipationInput')
    updateParticipationInput: UpdateParticipationInput,
  ) {
    return await this.participationService.update(
      updateParticipationInput.id,
      updateParticipationInput,
    );
  }

  @Mutation(() => Participation)
  async removeParticipation(@Args('id', { type: () => Int }) id: number) {
    return await this.participationService.remove(id);
  }
}
