import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateParticipationInput {
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
