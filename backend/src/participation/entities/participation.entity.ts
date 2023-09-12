import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Participation {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
