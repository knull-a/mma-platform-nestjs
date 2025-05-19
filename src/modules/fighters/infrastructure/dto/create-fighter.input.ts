import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsISO8601 } from 'class-validator';
import { WeightClass } from '../../../../common/weight-class.enum';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  nickname?: string;

  @Field(() => String)
  @IsISO8601()
  dateOfBirth: string;

  @Field()
  @IsString()
  nationality: string;

  @Field(() => WeightClass)
  weightClass: WeightClass;

  @Field(() => Number, { nullable: true })
  @IsInt()
  @IsOptional()
  currentRanking?: number;
}
