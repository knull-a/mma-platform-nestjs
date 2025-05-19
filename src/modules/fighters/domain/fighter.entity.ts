import { Column, Entity } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/base.entity';
import { WeightClass } from '../../../common/weight-class.enum';

@Entity('fighters')
@ObjectType()
export class Fighter extends BaseEntity {
  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  nickname?: string;

  @Field(() => Date)
  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: Date;

  @Field()
  @Column()
  nationality: string;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  wins: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  losses: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  draws: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  knockouts: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  submissions: number;

  @Field(() => WeightClass)
  @Column({
    type: 'enum',
    enum: WeightClass,
    name: 'weight_class',
  })
  weightClass: WeightClass;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true, name: 'current_ranking' })
  currentRanking?: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, name: 'profile_image_url' })
  profileImageUrl?: string;
}