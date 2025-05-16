import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/base.entity';
import { Fighter } from '../../fighters/domain/fighter.entity';
import { Event } from '../../events/domain/event.entity';
import { FightResult } from './fight-result.enum';
import { WeightClass } from '../../../common/weight-class.enum';

@Entity('fights')
@ObjectType()
export class Fight extends BaseEntity {
  @Field(() => Fighter)
  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'fighter1_id' })
  fighter1: Fighter;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'fighter2_id' })
  fighter2: Fighter;

  @Field(() => Event)
  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Field(() => WeightClass)
  @Column({
    type: 'enum',
    enum: WeightClass,
    name: 'weight_class',
  })
  weightClass: WeightClass;

  @Field(() => Int)
  @Column({ type: 'int' })
  rounds: number;

  @Field(() => FightResult, { nullable: true })
  @Column({
    type: 'enum',
    enum: FightResult,
    nullable: true,
  })
  result?: FightResult;

  @Field(() => Fighter, { nullable: true })
  @ManyToOne(() => Fighter, { nullable: true })
  @JoinColumn({ name: 'winner_id' })
  winner?: Fighter;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false, name: 'is_completed' })
  isCompleted: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false, name: 'is_ranking_updated' })
  isRankingUpdated: boolean;
}
