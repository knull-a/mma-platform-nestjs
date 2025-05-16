import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/base.entity';

@Entity('events')
@ObjectType()
export class Event extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;
}
