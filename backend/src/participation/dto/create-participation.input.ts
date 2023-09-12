import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateParticipationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
