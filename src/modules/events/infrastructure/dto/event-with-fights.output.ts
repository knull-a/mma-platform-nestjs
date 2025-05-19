import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from '../../domain/event.entity';
import { Fight } from '../../../fights/domain/fight.entity';

@ObjectType()
export class EventWithFights extends Event {
  @Field(() => [Fight])
  fights: Fight[];
}
