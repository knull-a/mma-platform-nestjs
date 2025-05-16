import { registerEnumType } from '@nestjs/graphql';

export enum WeightClass {
  FLYWEIGHT = 'FLYWEIGHT',
  BANTAMWEIGHT = 'BANTAMWEIGHT',
  FEATHERWEIGHT = 'FEATHERWEIGHT',
  LIGHTWEIGHT = 'LIGHTWEIGHT',
  WELTERWEIGHT = 'WELTERWEIGHT',
  MIDDLEWEIGHT = 'MIDDLEWEIGHT',
  LIGHT_HEAVYWEIGHT = 'LIGHT_HEAVYWEIGHT',
  HEAVYWEIGHT = 'HEAVYWEIGHT',
}

registerEnumType(WeightClass, {
  name: 'WeightClass',
  description: 'MMA weight classes',
});
