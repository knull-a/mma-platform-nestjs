import { InputType, PartialType, Field } from '@nestjs/graphql';
import { CreateFighterInput } from './create-fighter.input';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
  @Field(() => Number, { nullable: true })
  @IsInt()
  @IsOptional()
  wins?: number;

  @Field(() => Number, { nullable: true })
  @IsInt()
  @IsOptional()
  losses?: number;

  @Field(() => Number, { nullable: true })
  @IsInt()
  @IsOptional()
  draws?: number;

  @Field(() => Number, { nullable: true })
  @IsInt()
  @IsOptional()
  knockouts?: number;

  @Field(() => Number, { nullable: true })
  @IsInt()
  @IsOptional()
  submissions?: number;
}
 