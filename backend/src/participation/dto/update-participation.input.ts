import { CreateParticipationInput } from './create-participation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateParticipationInput extends PartialType(CreateParticipationInput) {
  @Field(() => Int)
  id: number;
}
