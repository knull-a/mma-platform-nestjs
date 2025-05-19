import { Field, Int, ObjectType } from '@nestjs/graphql';
import { WeightClass } from '../../../../common/weight-class.enum';

@ObjectType()
export class FighterStats {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => WeightClass)
  weightClass: WeightClass;

  @Field(() => Int)
  wins: number;

  @Field(() => Int)
  losses: number;

  @Field(() => Int)
  draws: number;

  @Field(() => Int)
  knockouts: number;

  @Field(() => Int)
  submissions: number;

  @Field(() => Int)
  winPercentage: number;

  @Field(() => Int, { nullable: true })
  currentRanking?: number;
}
