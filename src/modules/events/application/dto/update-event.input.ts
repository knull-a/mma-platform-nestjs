import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CreateEventInput } from './create-event.input';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field()
  @IsOptional()
  name?: string;

  @Field()
  @IsOptional()
  location?: string;

  @Field()
  @IsOptional()
  date?: Date;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
} 