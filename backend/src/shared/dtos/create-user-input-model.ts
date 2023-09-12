import { Field, Float, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInputModel {
  @Field(() => String, { description: 'First Name' })
  @IsString()
  @IsNotEmpty({ message: "O campo não pode estar vazio." })
  firstName: string;

  @Field(() => String, { description: 'Last Name' })
  @IsString()
  @IsNotEmpty({ message: "O campo não pode estar vazio." })
  lastName: string;

  @Field(() => Float, { description: 'Participation' })
  @IsNotEmpty({ message: "O campo não pode estar vazio." })
  participation: number;
}
