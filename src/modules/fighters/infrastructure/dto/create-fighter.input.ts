import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsInt, Min, Max } from 'class-validator';
import { WeightClass } from '../../../../common/weight-class.enum';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  nickname: string;

  @Field()
  @IsInt()
  @Min(18)
  @Max(60)
  age: number;

  @Field(() => WeightClass)
  weightClass: WeightClass;
}
