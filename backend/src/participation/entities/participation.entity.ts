import { IsNotEmpty } from 'class-validator';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Participation {
  @ObjectIdColumn()
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
