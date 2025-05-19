import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { WeightClass } from '../../../../common/weight-class.enum';

@InputType()
export class CreateFightInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  fighter1Id: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  fighter2Id: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  eventId: string;

  @Field(() => WeightClass)
  @IsNotEmpty()
  weightClass: WeightClass;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  rounds: number;
}
