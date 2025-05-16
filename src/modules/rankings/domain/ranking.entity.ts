import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/base.entity';
import { Fighter } from '../../fighters/domain/fighter.entity';
import { WeightClass } from '../../../common/weight-class.enum';

@Entity('rankings')
@ObjectType()
@Unique(['fighter', 'weightClass'])
export class Ranking extends BaseEntity {
  @Field(() => Fighter)
  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'fighter_id' })
  fighter: Fighter;

  @Field(() => WeightClass)
  @Column({
    type: 'enum',
    enum: WeightClass,
    name: 'weight_class',
  })
  weightClass: WeightClass;

  @Field(() => Int)
  @Column({ type: 'int' })
  position: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  points: number;
}
