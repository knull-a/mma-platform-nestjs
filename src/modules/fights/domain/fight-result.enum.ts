import { registerEnumType } from '@nestjs/graphql';

export enum FightResult {
  KNOCKOUT = 'KNOCKOUT',
  SUBMISSION = 'SUBMISSION',
  DECISION = 'DECISION',
  DRAW = 'DRAW',
  NO_CONTEST = 'NO_CONTEST',
}

registerEnumType(FightResult, {
  name: 'FightResult',
  description: 'Result of a fight',
});
