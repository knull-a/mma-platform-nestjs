import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFighterInput } from './create-fighter.input';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
  @ApiProperty({ description: 'All fields are optional for updates' })
  _allFieldsOptional?: boolean;
}
