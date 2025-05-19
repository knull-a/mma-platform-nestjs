import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { WeightClass } from '../../../../common/weight-class.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

@InputType()
export class CreateFighterInput {
  @ApiProperty({ description: 'First name of the fighter' })
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the fighter' })
  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Nickname of the fighter', required: false })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty({ description: 'Date of birth of the fighter' })
  @Field(() => Date)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ description: 'Nationality of the fighter' })
  @Field()
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({ description: 'Number of wins', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  wins: number;

  @ApiProperty({ description: 'Number of losses', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  losses: number;

  @ApiProperty({ description: 'Number of draws', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  draws: number;

  @ApiProperty({ description: 'Number of knockouts', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  knockouts: number;

  @ApiProperty({ description: 'Number of submissions', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  submissions: number;

  @ApiProperty({ 
    description: 'Weight class of the fighter',
    enum: WeightClass,
    enumName: 'WeightClass' 
  })
  @Field(() => WeightClass)
  @IsEnum(WeightClass)
  weightClass: WeightClass;

  @ApiProperty({ 
    description: 'Current ranking in the weight class',
    required: false
  })
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsPositive()
  @IsOptional()
  currentRanking?: number;
}
