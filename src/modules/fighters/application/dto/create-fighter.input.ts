import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WeightClass } from '../../../../common/weight-class.enum';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nickname?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @Field(() => WeightClass)
  @IsEnum(WeightClass)
  @IsNotEmpty()
  weightClass: WeightClass;
}
