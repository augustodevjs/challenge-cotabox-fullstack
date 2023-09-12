import { CreateParticipationInput } from './create-participation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateParticipationInput extends PartialType(
  CreateParticipationInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'First Name' })
  @IsNotEmpty()
  firstName: string;

  @Field(() => String, { description: 'Last Name' })
  @IsNotEmpty()
  lastName: string;

  @Field(() => Int, { description: 'Participation' })
  @IsNotEmpty()
  participation: number;
}
